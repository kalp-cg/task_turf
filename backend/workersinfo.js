const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing

const app = express();
const port = 3000;

// MongoDB connection details
const uri = "mongodb+srv://kalppatelcodinggita:kalp5121@cluster0.uowgl.mongodb.net/";
const dbName = "worker"; 
const collectionName = "workersinfo"; 

app.use(cors());
app.use(express.json());

let db, workerCollection;

// **Connect to MongoDB and initialize collection**
async function initializeDatabase() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        workerCollection = db.collection(collectionName);

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

// **Worker Registration (Sign Up)**
app.post('/workers', async (req, res) => {
    try {
        const { firstname, lastname, number, email, address, skill, experience, password, confirm_password } = req.body;

        // Validate all required fields
        if (!firstname || !lastname || !number || !email || !address || !skill || !experience || !password || !confirm_password) {
            return res.status(400).json({ message: "All fields are required" });
        } else if (password !== confirm_password) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }

        // Check if the email already exists
        const existingWorker = await workerCollection.findOne({ email });
        if (existingWorker) {
            return res.status(400).json({ message: "Email already registered. Please login." });
        }

        // Hash password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newWorker = {
            name: `${firstname} ${lastname}`, 
            service: skill, 
            charge: 600, 
            address: address,
            ratings: 4.5, 
            description: `${experience} experience in ${skill}`, 
            email,
            password: hashedPassword // Store hashed password
        };

        const result = await workerCollection.insertOne(newWorker);

        res.status(201).json({ message: "Worker registered successfully", workerId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Error adding worker", message: err.message });
    }
});

// **Worker Login Route**
app.post('/workers/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the worker exists
        const worker = await workerCollection.findOne({ email });
        if (!worker) {
            return res.status(400).json({ message: "Worker not found. Please register." });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, worker.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        res.status(200).json({ message: "Login successful", worker: { name: worker.name, service: worker.service } });
    } catch (err) {
        res.status(500).json({ error: "Error logging in", message: err.message });
    }
});

// Initialize the database and start the server
initializeDatabase();

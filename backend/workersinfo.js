const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

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

// **GET request to fetch all workers**
app.post('/workers', async (req, res) => {
    try {
        const { firstname, lastname, number, email, address, skill, experience,password,confoirm_password } = req.body;

        // Validate all required fields
        if (!firstname || !lastname || !number || !email || !address || !skill || !experience || !password || !confoirm_password) {
            return res.status(400).json({ message: "All fields are required" });
        } else if(password !== confoirm_password) {
            return res.status(400).json({ message: "Password and Confirm Password do not match"})
        }

            
        const newWorker = {
            name: `${firstname} ${lastname}`, // Combine firstname & lastname
            service: skill, // Map 'skill' to 'service'
            charge: 600, // Set a default charge (you can modify this)
            address: address,
            ratings: 4.5, // Default rating (you can modify this)
            description: `${experience} experience in ${skill}`, // Combine experience & skill
            password:"pass@1234",
            confoirm_password:"pass@1234"
        };

        const result = await workerCollection.insertOne(newWorker);

        res.status(201).json({ message: "Worker added successfully", workerId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Error adding worker", message: err.message });
    }
});


// Initialize the database and start the server
initializeDatabase();
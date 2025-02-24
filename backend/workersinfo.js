// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// // MongoDB connection details
// const uri = "mongodb+srv://kalppatelcodinggita:kalp5121@cluster0.uowgl.mongodb.net/";
// const dbName = "worker"; 
// const collectionName = "workersinfo"; 

// app.use(cors());
// app.use(express.json());

// let db, workerCollection;

// // **Connect to MongoDB and initialize collection**
// async function initializeDatabase() {
//     try {
//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//         console.log("Connected to MongoDB");

//         db = client.db(dbName);
//         workerCollection = db.collection(collectionName);

//         app.listen(port, () => {
//             console.log(`Server running at http://localhost:${port}`);
//         });
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//         process.exit(1);
//     }
// }

// // **POST request to add a worker**
// app.post('/workers', async (req, res) => {
//     try {
//         const { firstname, lastname, number, email, address, skill, experience, password, confirm_password } = req.body;

//         // Validate all required fields
//         if (!firstname || !lastname || !number || !email || !address || !skill || !experience || !password || !confirm_password) {
//             return res.status(400).json({ message: "All fields are required" });
//         } else if (password !== confirm_password) {
//             return res.status(400).json({ message: "Password and Confirm Password do not match" });
//         }

//         console.log(firstname)
//         console.log(lastname)
//         console.log(number)
//         console.log(email)
//         console.log(address)
//         console.log(skill)
//         console.log(experience)
//         console.log(password)
//         console.log(confirm_password)

//         console.log("email")

//         const newWorker = {
//             name: `${firstname} ${lastname}`,
//             email: email, 
//             phone: number, 
//             service: skill, 
//             charge: 600, 
//             address: address,
//             ratings: 4.5, 
//             description: `${experience} years of experience in ${skill}`, 
//             password: password 
//         };

//         const result = await workerCollection.insertOne(newWorker);

//         res.status(201).json({ message: "Worker added successfully", workerId: result.insertedId, data:"test" });
//     } catch (err) {
//         res.status(500).json({ error: "Error adding worker", message: err.message });
//     }
// });



// app.get('/workers', async (req, res) => {
//     try {
//         const workers = await workerCollection.find({}).toArray();
//         res.status(200).json(workers);
//     } catch (err) {
//         res.status(500).json({ error: "Error fetching workers", message: err.message });
//     }
// });

// // Initialize the database and start the server
// initializeDatabase();


const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');  // For hashing passwords
const jwt = require('jsonwebtoken'); // For authentication token

const app = express();
const port = 3000;

const uri = "mongodb+srv://kalppatelcodinggita:kalp5121@cluster0.uowgl.mongodb.net/";
const dbName = "worker"; 
const collectionName = "workersinfo"; 

app.use(cors());
app.use(express.json());

let db, workerCollection;

// **Connect to MongoDB**
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

// **Register a worker (hashed password)**
app.post('/workers', async (req, res) => {
    try {
        const { firstname, lastname, number, email, address, skill, experience, password, confirm_password } = req.body;

        if (!firstname || !lastname || !number || !email || !address || !skill || !experience || !password || !confirm_password) {
            return res.status(400).json({ message: "All fields are required" });
        } else if (password !== confirm_password) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }

        // **Hash the password before saving**
        const hashedPassword = await bcrypt.hash(password, 10);

        const newWorker = {
            name: `${firstname} ${lastname}`,
            email: email, 
            phone: number, 
            service: skill, 
            charge: 600, 
            address: address,
            ratings: 4.5, 
            description: `${experience} years of experience in ${skill}`, 
            password: hashedPassword // Store hashed password
        };

        const result = await workerCollection.insertOne(newWorker);
        res.status(201).json({ message: "Worker added successfully", workerId: result.insertedId });

    } catch (err) {
        res.status(500).json({ error: "Error adding worker", message: err.message });
    }
});

// **Login Route**
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // **Check if user exists**
        const user = await workerCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // **Compare entered password with hashed password**
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // **Generate JWT token**
        const token = jwt.sign({ userId: user._id, email: user.email }, "SECRET_KEY", { expiresIn: "1h" });

        // Return user data (excluding password)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            service: user.service,
            address: user.address,
            ratings: user.ratings,
            description: user.description
        };

        res.status(200).json({ message: "Login successful", token, user: userData });

    } catch (err) {
        res.status(500).json({ error: "Error logging in", message: err.message });
    }
});

// **Get all workers**
app.get('/workers', async (req, res) => {
    try {
        const workers = await workerCollection.find({}).toArray();
        res.status(200).json(workers);
    } catch (err) {
        res.status(500).json({ error: "Error fetching workers", message: err.message });
    }
});

// **Initialize database and start server**
initializeDatabase();
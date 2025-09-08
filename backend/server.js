
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// MongoDB connection details
const uri = "mongodb+srv://kalppatelcodinggita:kalp5121@cluster0.uowgl.mongodb.net/";
const dbName = "worker"; // Replace with your actual database name
const collectionName = "workers"; // Replace with your actual collection name

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
app.get('/workers', async (req, res) => {
    try {
        const allWorkers = await workerCollection.find({}).toArray();
        if (allWorkers.length === 0) {
            return res.status(404).json({ message: "No workers found" });
        }
        res.status(200).json(allWorkers);
    } catch (err) {
        res.status(500).json({ error: "Error fetching workers", message: err.message });
    }
});

// **GET request to fetch a worker by its service**
app.get('/workers/:service', async (req, res) => {
    try {
        const serviceType = req.params.service; // Get service from URL
        const workers = await workerCollection.find({ service: serviceType }).toArray();

        if (workers.length === 0) {
            return res.status(404).json({ message: `No workers found for service: ${serviceType}` });
        }
        
        res.status(200).json(workers);
    } catch (err) {
        res.status(500).json({ error: "Error fetching workers", message: err.message });
    }
});

// **Get request to fetch worker by its area
app.get('/workers/:service/:location', async (req, res) => {
    try {
        const { service, location } = req.params; // Extract parameters from URL
        const workers = await workerCollection.find({ service: service, address: { $regex: location, $options: "i" } }).toArray();

        if (workers.length === 0) {
            return res.status(404).json({ message: `No workers found for service: ${service} in location: ${location}` });
        }
        
        res.status(200).json(workers);
    } catch (err) {
        res.status(500).json({ error: "Error fetching workers", message: err.message });
    }
});





// Initialize the database and start the server
initializeDatabase();


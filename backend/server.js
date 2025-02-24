// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 3000;
// const uri = "mongodb+srv://jatinrajwani19:Jkagency2024@cluster0.bwp2q.mongodb.net/";
// const dbName = "worker";

// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }));
// app.use(express.json());

// let db, worker;
// const client = new MongoClient(uri, { useUnifiedTopology: true });

// async function initializeDatabase() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//         db = client.db(dbName);
//         worker = db.collection("worker");
//         app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//         process.exit(1);
//     }
// }

// initializeDatabase();

// app.get('/workers', async (req, res) => {
//     try {
//         const allWorkers = await worker.find({}).toArray();
//         if (allWorkers.length === 0) {
//             return res.status(404).json({ message: "No workers found" });
//         }
//         res.status(200).json(allWorkers);
//     } catch (err) {
//         res.status(500).json({ error: "Error fetching workers", message: err.message });
//     }
// });



// app.get('/hostels/:area', async (req, res) => {
//     try {
//         const area = req.params.area.toLowerCase();
//         const hostelData = await hostel.findOne({ area });
//         if (!hostelData) return res.status(404).json({ message: "No hostels found in this area." });
//         res.status(200).json(hostelData);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// app.get('/hostels/:area/:name', async (req, res) => {
//     try {
//         const { area, name } = req.params;
//         const hostelData = await hostel.findOne({ area: area.toLowerCase(), "Places.name": { $regex: new RegExp(`^${name}$`, "i") } });
//         if (!hostelData) return res.status(404).json({ message: "No hostel found with the given name in this area." });
//         const hostelDetail = hostelData.Places.find(place => place.name.toLowerCase() === name.toLowerCase());
//         res.status(200).json(hostelDetail);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// app.post('/hostels', async (req, res) => {
//     try {
//         const newHostel = req.body;
//         const result = await hostel.insertOne(newHostel);
//         res.status(201).send(`Hostel added with ID: ${result.insertedId}`);
//     } catch (err) {
//         res.status(500).send("Error adding hostel: " + err.message);
//     }
// });

// app.post('/hostels/:area', async (req, res) => {
//     try {
//         const { area } = req.params;
//         const newHostel = req.body;
//         const result = await hostel.updateOne({ area }, { $push: { "Places": newHostel } });
//         if (result.matchedCount === 0) return res.status(404).send(`No area found with name: ${area}`);
//         res.status(201).send("Hostel added successfully.");
//     } catch (err) {
//         res.status(500).send("Error adding hostel: " + err.message);
//     }
// });

// app.put('/hostels/:area/:name', async (req, res) => {
//     try {
//         const { area, name } = req.params;
//         const updatedData = req.body;
//         const result = await hostel.updateOne({ area, "Places.name": name }, { $set: { "Places.$": updatedData } });
//         if (result.matchedCount === 0) return res.status(404).send('Hostel not found');
//         res.status(200).send('Hostel updated successfully');
//     } catch (err) {
//         res.status(500).send("Error updating hostel: " + err.message);
//     }
// });

// app.delete('/hostels/:area', async (req, res) => {
//     try {
//         const area = req.params.area;
//         const result = await hostel.deleteOne({ area });
//         if (result.deletedCount === 0) return res.status(404).send('Area not found');
//         res.status(200).send(`Hostels in area '${area}' deleted successfully`);
//     } catch (err) {
//         res.status(500).send("Error deleting hostels: " + err.message);
//     }
// });

// app.delete('/hostels/:area/:name', async (req, res) => {
//     try {
//         const { area, name } = req.params;
//         const result = await hostel.updateOne({ area }, { $pull: { Places: { name } } });
//         if (result.modifiedCount === 0) return res.status(404).send('Hostel not found');
//         res.status(200).send(`Hostel '${name}' in area '${area}' deleted successfully`);
//     } catch (err) {
//         res.status(500).send("Error deleting hostel: " + err.message);
//     }
// });

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


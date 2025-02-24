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


const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer"); // For handling file uploads
const app = express();
const port = 3000;

// MongoDB connection details
const uri = "mongodb+srv://kalppatelcodinggita:kalp5121@cluster0.uowgl.mongodb.net/";
const dbName = "worker";
const collectionName = "workersinfo";

// Middleware
app.use(cors());
app.use(express.json());
const upload = multer(); // For parsing multipart/form-data

let db, workerCollection, servicesproviderCollection;

// Connect to MongoDB
async function initializeDatabase() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    workerCollection = db.collection(collectionName);
    servicesproviderCollection = db.collection("servicesprovider");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

// Register a worker
app.post("/workers", async (req, res) => {
  try {
    const { firstname, lastname, number, email, address, skill, experience, password, confirm_password } = req.body;
    if (!firstname || !lastname || !number || !email || !address || !skill || !experience || !password || !confirm_password) {
      return res.status(400).json({ message: "All fields are required" });
    } else if (password !== confirm_password) {
      return res.status(400).json({ message: "Password and Confirm Password do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newWorker = {
      name: `${firstname} ${lastname}`,
      email,
      phone: number,
      service: skill,
      charge: 600,
      address,
      ratings: 4.5,
      description: `${experience} years of experience in ${skill}`,
      password: hashedPassword,
    };
    const result = await workerCollection.insertOne(newWorker);
    res.status(201).json({ message: "Worker added successfully", workerId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Error adding worker", message: err.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await workerCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, "SECRET_KEY", { expiresIn: "1h" });
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      service: user.service,
      address: user.address,
      ratings: user.ratings,
      description: user.description,
    };
    res.status(200).json({ message: "Login successful", token, user: userData });
  } catch (err) {
    res.status(500).json({ error: "Error logging in", message: err.message });
  }
});

// Get all workers
app.get("/workers", async (req, res) => {
  try {
    const workers = await workerCollection.find({}).toArray();
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching workers", message: err.message });
  }
});

// Get profile by userId
app.get("/api/profile", async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await workerCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile", message: err.message });
  }
});

// Update profile
app.put("/api/profile", async (req, res) => {
  try {
    const { userId, ...updates } = req.body;
    delete updates.password; // Prevent password updates here
    const result = await workerCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating profile", message: err.message });
  }
});

// Upload profile photo
app.post("/api/profile/photo", upload.single("photo"), async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const photoUrl = `https://your-storage-service.com/${file.originalname}`; // Replace with your storage logic
    const result = await workerCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { photoUrl } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ photoUrl });
  } catch (err) {
    res.status(500).json({ error: "Error uploading photo", message: err.message });
  }
});

app.get('/user', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {

        // Find the user by email
        const user = await servicesproviderCollection.findOne({ email });

        if (user) {
            // If user exists, return the user details
            res.json({
                name: user.name,
                email: user.email,
                picture: user.picture
            });
        } else {
            // If user does not exist, prompt to create one
            res.status(404).json({ message: 'User not found. Please create a new user.' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/user', async (req, res) => {
    const { name, email, picture, address, experience, phone, skills } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    try {
        

        // Check if the email already exists in the database
        const existingUser = await servicesproviderCollection.findOne({ email });

        if (existingUser) {
            // If user exists, return the existing user details
            return res.status(409).json({
                message: 'User already exists',
                user: {
                    name: existingUser.name,
                    email: existingUser.email,
                    picture: existingUser.picture
                }
            });
        }

        // If user does not exist, create a new user
        const newUser = { name, email, picture, address, experience, phone, skills };
        await servicesproviderCollection.insertOne(newUser);

        // Return the newly created user
        res.status(201).json({
            message: 'User created successfully',
            user: {
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/profile', async (req, res) => {
    try {
      const { userId, firstname, lastname, email, address, skill, experience } = req.body;
  
      // Update user data in the database
      const updatedUser = await servicesproviderCollection.updateOne(
        { userId },
        { $set: { firstname, lastname, email, address, skill, experience } }
      );
  
      if (updatedUser.modifiedCount > 0) {
        res.status(200).json({ message: 'Profile updated successfully!' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Initialize database and start server
initializeDatabase();
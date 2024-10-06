const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const User = require('./models/User'); 
const Car = require('./models/Car'); 
const Repair = require('./models/Repair'); 
const Client = require('./models/Client'); 
const app = express();
var cors = require("cors");
const bcrypt = require('bcrypt');

const socketIo = require('socket.io');
const http = require('http');
const port = 3000;
const server = http.createServer(app);
const WebSocket = require('ws');

app.use(cors())
app.use(express.json()); // To parse JSON request bodies
mongoose.connect('mongodb://127.0.0.1:27017/db')
  .then(() => console.log('Connected!'));
//Authentication===================================
app.post('/api/users/register', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).send({ message: 'Email and password required' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const newUser = new User({ phone:phone, password: hashedPassword });
    await newUser.save();
  
    return res.json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).send({ message: 'Error inserting user', error });
  }
});
  // Login user and return JWT
  app.get('/api/auth/login', async (req, res) => {
    const {phone,hashedPassword} = req.query;
    try {
      // Compare the received hash with the one stored in the DB
      const user = await User.findOne({ phone });
      bcrypt.compare(hashedPassword, user.password)
      if (!user) {
        console.error('Error logging in:', 'Invalid phone or password');
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }
      // Generate and return a JWT token
     // const jwt = await generateToken(user);
      //res.json({ token: jwt, user });
      res.json({  user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  
//Authentication===================================

app.post('/api/users/post', async (req, res) => {
    try {
        const newUser = new User(req.body); // Create a new instance of the User model
        const result = await newUser.save(); // Save the new user to the database
        res.status(200).send(result); // Send the result back to the client
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send({ message: 'Error inserting user', error });
    }
});
app.post('/api/cars/post', async (req, res) => {
  try {
      const newCar = new Car(req.body); // Create a new instance of the User model
      const result = await newCar.save(); // Save the new user to the database
      res.status(200).send(result); // Send the result back to the client
      console.log(req.body)
      console.error('new car added');
  } catch (error) {
      console.error('Error inserting user:', error);
      console.log(req.body)
      res.status(500).send({ message: 'Error inserting user', error });
  }
});
app.post('/api/clients/post', async (req, res) => {
  try {
    const newClient = new Client({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      phone:req.body.phone,
      cars: req.body.cars 
    });

    const savedClient = await newClient.save(); // Save the client to the database
    res.status(201).send(savedClient); // Send the saved client back
    console.log(req.body)
  } catch (error) {
    console.log(req.body)

    console.error('Error adding client:', error);
    res.status(500).send({ message: 'Error adding client', error });
  }
});



app.delete('/api/users/:id', async (req, res) => {
  try {
      const userId = req.params.id; // Get the user ID from the request parameters
      const result = await User.findByIdAndDelete(userId); // Delete the user from the database
      
      if (!result) {
          return res.status(404).send({ message: 'User not found' });
      }
      
      res.status(200).send({ message: 'User deleted successfully' }); // Send success message
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send({ message: 'Error deleting user', error });
  }
});

// Update user by ID
app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const updatedUser = req.body; // Get the updated user data from the request body
    
    const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

      if (!updatedUser) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send(updatedUser);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send({ message: 'Error updating user', error });
  }
});


  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
   //   io.emit('userUpdate'); // Emit 'userUpdate' event to all connected clients
      res.json(users); // Send the users as a JSON response
    } catch (err) {
      res.status(500).json({ error: err.message }); // Handle errors
    }
  });
  app.get('/api/users/:name', async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.name }); // Find user by name
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//repairs service======================================
app.get('/api/clients/searchByPhone', async (req, res) => {
  const { phone } = req.query;

  try {
    const clients = await Client.findOne({
      phone: phone // Match the phone number exactly
    });
    
    res.status(200).send(clients);
  } catch (error) {
    console.error('Error searching for clients by phone:', error);
    res.status(500).send({ message: 'Error searching for clients', error });
  }
});
app.get('/api/cars/searchByNumber', async (req, res) => {
  const { number } = req.query;

  try {
    const cars = await Car.findOne({
      number: number // Match the car number exactly
    });

    res.status(200).send(cars);
  } catch (error) {
    console.error('Error searching for cars by number:', error);
    res.status(500).send({ message: 'Error searching for cars', error });
  }
});
app.get('/api/cars/byClientPhone', async (req, res) => {
  const { phone } = req.query; // Extract phone number from query parameters

  try {
    // Find the client by phone number
    const client = await Client.findOne({ phone: phone });
    
    if (!client) {
      return res.status(404).send({ message: 'Client not found' });
    }

    // Retrieve all cars for the found client
    const cars = await Car.find({ number: { $in: client.cars } }); // Match car numbers in the client's car list
    
    res.status(200).send(cars); // Return the list of cars
  } catch (error) {
    console.error('Error retrieving cars by client phone:', error);
    res.status(500).send({ message: 'Error retrieving cars', error });
  }
});


app.get('/api/clients/ownersByCarNumber', async (req, res) => {
  const { carNumber } = req.query; // Extract car number from query parameters

  try {
    const clients = await Client.find({ cars: carNumber }); // Find clients with the specified car number
    res.status(200).send(clients); // Return the list of clients
  } catch (error) {
    console.error('Error retrieving clients by car number:', error);
    res.status(500).send({ message: 'Error retrieving clients', error });
  }
});
console.log()

// repairs=====================
app.post('/api/repairs', async (req, res) => {
  const { carNumber, clientPhone, price, issue, resolved } = req.body; // Extract all required fields from request body

  try {
    const repair = await Repair.create({ carNumber, clientPhone, price, issue, resolved }); // Create a new repair document
    res.status(201).send(repair); // Return the newly created repair
  } catch (error) {
    console.error('Error creating repair:', error);
    res.status(500).send({ message: 'Error creating repair', error });
  }
});
app.patch('/api/repairs/:repairId', async (req, res) => {
  const repairId = req.params.repairId;

  try {
    const repair = await Repair.findByIdAndUpdate(repairId, {
      $set: {
        resolved: true
      }
    }, { new: true });

    if (!repair) {
      return res.status(404).send({ message: 'Repair not found' });
    }

    res.status(200).send(repair);
  } catch (error) {
    console.error('Error updating repair:', error);
    res.status(500).send({ message: 'Error updating repair', error });
  }
});
// Get all unresolved repairs
// Get all unresolved repairs
app.get('/api/repairs/unresolved', async (req, res) => {
  try {
    const unresolvedRepairs = await Repair.find({ resolved: false });

    // Fetch car data and client data for each repair
    const repairsWithCarAndClientData = await Promise.all(unresolvedRepairs.map(async (repair) => {
      const car = await Car.findOne({ number: repair.carNumber });
      const client = await Client.findOne({ phone: repair.clientPhone });

      return {
        ...repair._doc,
        car: car ? car._doc : null,
        client: client ? client._doc : null,
      };
    }));

    res.status(200).send(repairsWithCarAndClientData);
  } catch (error) {
    console.error('Error retrieving unresolved repairs:', error);
    res.status(500).send({ message: 'Error retrieving unresolved repairs', error });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

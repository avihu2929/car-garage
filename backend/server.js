// git add .
// git commit -m "test"
// git push heroku main

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); 
const Car = require('./models/Car'); 
const Repair = require('./models/Repair'); 
const Client = require('./models/Client'); 
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();
var cors = require("cors");
const bcrypt = require('bcryptjs');
const https = require('https');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
app.use(cors({ origin: "https://car-garage-frontend-be7d1240bcfe.herokuapp.com", credentials: true }))//{ origin: "https://car-garage-frontend-be7d1240bcfe.herokuapp.com", credentials: true }
// const corsOptions = {
//   origin: 'http://localhost:4200', // Change this to match your Angular app's URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Add any other HTTP methods you might need
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Content-Type and Authorization
// };

// app.use(cors(corsOptions));

app.use(express.json()); // To parse JSON request bodies
const port = process.env.PORT || 8080; 
const mongoURI = process.env.MONGODB_URI 

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//Authentication===================================
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) return res.sendStatus(401); 

  jwt.verify(token,jwtSecret , (err, user) => {
    if (err) return res.sendStatus(403); 
    console.log("user authenticated")
    req.user = user; 
    next(); 
  });
};
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

  app.post('/api/auth/login', async (req, res) => {
    const { phone, password } = req.body; 
    console.log(phone, password);
    
    try {

      const user = await User.findOne({ phone });
  
      if (!user) {
        console.error('Error logging in:', 'Invalid phone or password');
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password); 
  
      if (!isPasswordValid) {
        console.error('Error logging in:', 'Invalid phone or password');
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = generateToken(user);
      res.status(200).json({ message: 'Login successful', token });
  
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  


  const generateToken = (user) => {
    // Define the payload and options for the token
    const payload = { id: user._id, phone: user.phone }; // You can include any user info you need
    const options = { expiresIn: '1h' }; // Token expiration time
    const secret = jwtSecret;
    // move secret to enviroment variable in production
    // Generate and return the token
    return jwt.sign(payload, secret, options);
  };
  
  
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
app.post('/api/cars/post',authenticateToken, async (req, res) => {
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
app.post('/api/clients/post',authenticateToken, async (req, res) => {
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



app.delete('/api/users/:id',authenticateToken, async (req, res) => {
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


  app.get('/api/users',authenticateToken, async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
   //   io.emit('userUpdate'); // Emit 'userUpdate' event to all connected clients
      res.json(users); // Send the users as a JSON response
    } catch (err) {
      res.status(500).json({ error: err.message }); // Handle errors
    }
  });
  app.get('/api/users/:name',authenticateToken, async (req, res) => {
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
app.get('/api/clients/searchByPhone',authenticateToken, async (req, res) => {
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
app.get('/api/cars/searchByNumber',authenticateToken, async (req, res) => {
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
app.get('/api/cars/byClientPhone',authenticateToken, async (req, res) => {
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


app.get('/api/clients/ownersByCarNumber',authenticateToken, async (req, res) => {
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
app.post('/api/repairs',authenticateToken, async (req, res) => {
  const { carNumber, clientPhone, price, issue, resolved } = req.body; // Extract all required fields from request body

  try {
    const repair = await Repair.create({ carNumber, clientPhone, price, issue, resolved }); // Create a new repair document
    res.status(201).send(repair); // Return the newly created repair
    io.emit('refreshRepairs');
  } catch (error) {
    console.error('Error creating repair:', error);
    res.status(500).send({ message: 'Error creating repair', error });
  }
});
app.patch('/api/repairs/:repairId',authenticateToken, async (req, res) => {
  const repairId = req.params.repairId;
  const { cost, fixes } = req.body;
  try {
    const repair = await Repair.findByIdAndUpdate(repairId, {
      $set: {
        resolved: true,
        cost,
        fixes
      }
    }, { new: true });
    io.emit('refreshRepairs');
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
app.get('/api/repairs/unresolved',authenticateToken, async (req, res) => {
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

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

////////////////
// server.js

const server = require('http').createServer(app);
serverOptions= {
  cors: {
    origin: ["https://car-garage-frontend-be7d1240bcfe.herokuapp.com"],
    credentials: true
  },
}
const io = require('socket.io')(server,serverOptions);
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
// const createServer = require('http').createServer;
// const http = require('http');
// const { Server } = require('socket.io');

// const httpServer = createServer(app);
// serverOptions= {
//   cors: {
//     origin: ["https://car-garage-frontend-be7d1240bcfe.herokuapp.com"],
//   },
// }
// const io = new Server(httpServer, serverOptions);

//  httpServer.listen(port);
// const { createServer } = require("https");
// const { Server } = require("socket.io");
// const httpsServer = createServer(app);
// serverOptions= {
//   cors: {
//     origin: ["https://car-garage-frontend-be7d1240bcfe.herokuapp.com"],
//     methods: ["GET", "POST"],
//     allowedHeaders: [
//       "Content-Type",       // Allow Content-Type header
//       "Authorization",      // Allow Authorization header
//       "Origin",             // Allow Origin header
//       "X-Custom-Header",    // Allow any custom headers you may use
//       "Accept",             // Allow Accept header
//       "X-Requested-With"    // Allow X-Requested-With header for AJAX requests
//   ],
//     credentials: true
//   },
// }
// const io = new Server(httpsServer, serverOptions);
// httpsServer.listen(process.env.PORT);
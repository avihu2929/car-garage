const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const User = require('./models/User'); 
const app = express();
var cors = require("cors");
const socketIo = require('socket.io');
const http = require('http');
const port = 3000;
const server = http.createServer(app);

app.use(cors())
app.use(express.json()); // To parse JSON request bodies

mongoose.connect('mongodb://127.0.0.1:27017/db')
  .then(() => console.log('Connected!'));

// Define the POST route to add a new user
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

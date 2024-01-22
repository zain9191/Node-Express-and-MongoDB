const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');



const app = express(); // Initialize express app


const stufRoutes = require("./routes/stuff")
const userRoutes = require("./routes/user")


// Connect to MongoDB
mongoose.connect('mongodb+srv://zain:zain315216@firstcluster.bn3sbzb.mongodb.net/yourDatabaseName?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(error => {
    console.error('Connexion à MongoDB échouée!', error);
    process.exit(1); // Exit the application if MongoDB connection fails
  });



  app.use(express.json());

  // CORS middleware
  app.use((req, res, next) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  


app.use(bodyParser.json())

app.use("/api/stuff",stufRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// Export the Express app
module.exports = app;

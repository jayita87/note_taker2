// Require dependencies
const express = require('express');
const path = require('path');
const router = require('./routes/apiRoutes.js');
const fs = require('fs');
const db = require("./db/db.json");
const getID = require("../helpers/generateID.js");
 // Initialize express app
const app = express();

const PORT = process.env.port || 3001;
app.use(express.static(path.join(__dirname, 'public')));
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);



app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Setup listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

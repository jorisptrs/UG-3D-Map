const express = require('express');
const filesRouter = require('./file-route');
const multer = require('multer');
const path = require('path');

const port = 8080;
const index_path = path.join(__dirname,'..','frontend','index.html');

var lastFileName = "";

// Init app
const app = express();

// serve index.html
app.get('/', (req, res) => {
  //avoid using slashes for linux vs windows
  res.sendFile(index_path);
});

// serve any requested files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'..','frontend',req.path));
});

// Start to listen at port
app.listen(port, () => console.log(`Server running on port ${port}`));
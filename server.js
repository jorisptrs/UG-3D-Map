const express = require('express');
const path = require('path');

const port = 8080;
//avoid using slashes for linux vs windows
const index_path = path.join(__dirname,'public','frontend','index.html');

// Init app
const app = express();

// serve index.html
app.get('/', (req, res) => {
  res.sendFile(index_path);
});

// serve any requested files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public',req.path));
});

// Start to listen at port
app.listen(port, () => console.log(`Server running on port ${port}`));
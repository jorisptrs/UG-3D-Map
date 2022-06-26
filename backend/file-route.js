/* https://github.com/bradtraversy/nodeuploads */

const path = require('path');
const multer = require('multer');
const express = require('express');
const router = express.Router();

// serve index.html
router.get('/', (req, res) => res.render(path.join(__dirname,'..','frontend','index.js')));

// serve any requested files
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'..','frontend',req.path));
});

module.exports = router;
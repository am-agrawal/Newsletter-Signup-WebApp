const express = require('express');
const path = require('path');
const { handleFormSubmission } = require('../controllers/emailController');

const router = express.Router();

// Serve the HTML form
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// Handle form submission
router.post('/', handleFormSubmission);

module.exports = router;

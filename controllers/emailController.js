const path = require('path');
const { addToBrevo, sendThankYouEmail } = require('../services/brevoService');

exports.handleFormSubmission = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    await addToBrevo(firstName, lastName, email);
    await sendThankYouEmail(firstName, email);
    res.sendFile(path.join(__dirname, '../views/success.html'));
  } catch (error) {
    console.error(error);
    res.sendFile(path.join(__dirname, '../views/failure.html'));
  }
};

const path = require('path');
const { addToBrevo, sendThankYouEmail } = require('../services/brevoService');

exports.handleFormSubmission = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const isAPI = req.query.api === 'true';

  try {
    await addToBrevo(firstName, lastName, email);
    await sendThankYouEmail(firstName, email);
    if (isAPI) {
      return res.json({
        success: true,
        message: 'Thank you for signing up!',
      });
    } 
    return res.sendFile(path.join(__dirname, '../views/success.html'));
  } catch (error) {
    console.error(
      'Error adding contact:',
      error.response?.body || error.message
    );
    if (isAPI) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
    return res.sendFile(path.join(__dirname, '../views/failure.html'));
  }
};

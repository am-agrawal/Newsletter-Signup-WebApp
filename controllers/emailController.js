const { addToBrevo, sendThankYouEmail } = require('../services/brevoService');

exports.handleFormSubmission = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    await addToBrevo(firstName, lastName, email);
    await sendThankYouEmail(firstName, email);
    res.send('<h2>Thank you! Check your email for a confirmation.</h2>');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing your request.');
  }
};

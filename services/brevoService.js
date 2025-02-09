const SibApiV3Sdk = require('sib-api-v3-sdk');

const apiKey = process.env.BREVO_API_KEY;
const client = SibApiV3Sdk.ApiClient.instance;
const apiKeyInstance = client.authentications['api-key'];
apiKeyInstance.apiKey = apiKey;

const contactApi = new SibApiV3Sdk.ContactsApi();
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

exports.addToBrevo = async (firstName, lastName, email) => {
  const contactData = {
    email,
    attributes: { FIRSTNAME: firstName, LASTNAME: lastName },
    listIds: [2], // Replace with your Brevo list ID
  };

  await contactApi.createContact(contactData);
};

exports.sendThankYouEmail = async (firstName, email) => {
  const emailData = {
    sender: { email: 'your-email@example.com', name: 'Your Name' },
    to: [{ email, name: firstName }],
    subject: 'Thank You for Signing Up!',
    htmlContent: `<p>Hi ${firstName},</p><p>Thank you for signing up!</p>`,
  };

  await emailApi.sendTransacEmail(emailData);
};

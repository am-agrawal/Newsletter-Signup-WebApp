const SibApiV3Sdk = require('sib-api-v3-sdk');
const path = require('path');
const fs = require('fs');

const apiKey = process.env.BREVO_API_KEY;
const client = SibApiV3Sdk.ApiClient.instance;
const apiKeyInstance = client.authentications['api-key'];
apiKeyInstance.apiKey = apiKey;

const contactApi = new SibApiV3Sdk.ContactsApi();
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

exports.addToBrevo = async (firstName, lastName, email) => {
  const listId = Number(process.env.BREVO_LIST_ID);
  const contactData = {
    email,
    attributes: { FIRSTNAME: firstName, LASTNAME: lastName },
    listIds: [listId],
  };

  try {
    await contactApi.createContact(contactData);
  } catch (error) {
    if (error.response && error.response.body.code === 'duplicate_parameter') {
      console.log(
        `Contact with email ${email} already exists. Updating contact.`
      );
      await contactApi.updateContact(email, {
        attributes: { FIRSTNAME: firstName, LASTNAME: lastName },
        listIds: [listId],
      });
    } else {
      throw error;
    }
  }
};

exports.sendThankYouEmail = async (firstName, email) => {
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;

  const templatePath = path.join(
    __dirname,
    '../templates/thank_you_email.html'
  );
  let emailHtml = fs.readFileSync(templatePath, 'utf-8');
  emailHtml = emailHtml.replace('{{firstName}}', firstName);

  const emailText = `Hi ${firstName},\n\nThanks for signing up! 🎉 We're excited to have you on board.\n\nStay tuned for valuable insights and exclusive content!\n\nBest,\n${senderName}\n(This is an automated email. Please do not reply.)`;

  const emailData = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email, name: firstName }],
    subject: 'Thank You for Signing Up!',
    htmlContent: emailHtml,
    textContent: emailText,
  };

  await emailApi.sendTransacEmail(emailData);
};

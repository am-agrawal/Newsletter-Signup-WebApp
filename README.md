# Newsletter Signup App

This is a simple newsletter signup application built with Node.js, Express, and Brevo API. It allows users to sign up for a newsletter and stores their details securely.

## Features

- User signup with email and name
- Integration with Brevo API for newsletter subscription
- Error handling and validation
- Lightweight and containerized for easy deployment

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/amankumaragrawal/newsletter-signup.git
   ```

2. Change to the project directory:
   ```sh
   cd newsletter-signup
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add your Mailchimp API key:
   ```env
    BREVO_API_KEY=your_api_key
    BREVO_LIST_ID=list_id
    BREVO_SENDER_EMAIL=verified_sender_email_id
    BREVO_SENDER_NAME=sender_name
   ```

## Running the Application

### Locally
```sh
npm start
```
The app will be available at `http://localhost:3000`

### Using Docker
1. Build the Docker image:
   ```sh
   docker build -t newsletter-app .
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 newsletter-app
   ```


## License

This project is licensed under the MIT License.

---
Feel free to modify and improve the project!



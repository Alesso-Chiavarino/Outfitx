# Outfitx

Outfitx is a backend project built with Express.js that provides an API for managing and exploring outfits. This application allows users to create, update, delete, and search for custom outfit sets.

If you have any questions or suggestions, please contact me at If you have any questions or suggestions, please contact me at [mailto:alessochiavarino@gmail.com](gmail.com/alessochiavarino) 

## Deployment

RAILWAY ==> https://outfitx-production.up.railway.app
RENDER ==> https://outfitx.onrender.com

(The main deployment is on Railway)

## ADMIN USER

With this following user you can access to the admin panel and manage the app

- email: admin@coder.com
- password: 123

## TEST CARDS FOR MERCADOPAGO

Put the following token in the field "MERCADOPAGO_ACCESS_TOKEN_TEST" in the .env file to test the payment system:

TEST-7302928272959470-070518-c255a0a5951e0f5fe50e5d753e0ea0e6-227952207

Use the following test cards to simulate a transaction:

- FOR ARGENTINA:
VISA: 4509 9535 6623 3704 - CVV: 123 - DATE: 11/25
APPROVED SIMULATION => titular: APRO - Document: 12345678
REJECTED SIMULATION => titular: OTHE - Document: 12345678
---------------------------------------------------
- FOR COLOMBIA:
VISA: 4099 8333 6166 3634 - CVV: 123 - DATE: 11/25
APPROVED SIMULATION => titular: APRO - Document: 123456789
REJECTED SIMULATION => titular: OTHE - Document: 123456789
--------------------------------------------------- 

- FOR PERU:
VISA: 4009 1753 3280 6176 - CVV: 123 - DATE: 11/25
APPROVED SIMULATION => titular: APRO - Document: 123456789
REJECTED SIMULATION => titular: OTHE - Document: 123456789
--------------------------------------------------- 

- FOR CHILE:
VISA: 4168 8188 4444 7115 - CVV: 123 - DATE: 11/25
APPROVED SIMULATION => titular: APRO - Document: 123456789
REJECTED SIMULATION => titular: OTHE - Document: 123456789
--------------------------------------------------- 

For more information visit https://www.mercadopago.com.ar/developers/panel/app/7302928272959470/test-cards (need an account)

## Environment Variables

PORT = 8080
DATA_SOURCE = MONGO # OPTIONS: MONGO - FILE
MONGO_ATLAS_URI = URI OF MONGODB ATLAS #OBLIGATORY
MONGO_LOCAL_URI = URI OF MONGODB LOCAL # NO IMPORTANT
GOOGLE_APLICATION_PASSWORD = PASSWORD OF GOOGLE APLICATION #OBLIGATORY
GOOGLE_EMAIL = EMAIL OF GOOGLE ACCOUNT 
TWILIO_AUTH_TOKEN = AUTH TOKEN OF TWILIO # NO IMPORTANT
TWILIO_ACCOUNT_SID = ACCOUNT SID OF TWILIO # NO IMPORTANT
TWILIO_PHONE_NUMBER = PHONE NUMBER OF TWILIO # NO IMPORTANT
SECRET_KEY = KEY OF TOKEN #OBLIGATORY
SESSION_KEY = KEY OF SESSION #OBLIGATORY
ADMIN_NAME = THE NAME OF ADMIN #OBLIGATORY
ADMIN_PASSWORD = THE PASSWORD OF ADMIN #OBLIGATORY
GITHUB_CLIENT_ID = CLIENT ID OF GITHUB #OBLIGATORY
GITHUB_CLIENT_SECRET = CLIENT SECRET OF GITHUB #OBLIGATORY
GITHUB_CALLBACK_URL = CALLBACK URL OF GITHUB #OBLIGATORY
MERCADOPAGO_ACCESS_TOKEN_TEST = TEST-7302928272959470-070518-c255a0a5951e0f5fe50e5d753e0ea0e6-227952207 #OBLIGATORY (use this to test)

## Technologies Used

- Express.js: Fast and minimalist web framework for Node.js.
- MongoDB: Flexible and scalable NoSQL database.
- Mocha: JavaScript testing framework.
- JWT: JSON Web Tokens for authentication and authorization.
- Swagger: Tool for documenting and testing RESTful APIs.
- bcrypt: Library for password hashing.
- commander: Command-line interface utility.
- connect-flash: Flash messages middleware for Express.js.
- cookie-parser: Middleware for parsing cookies in Express.js.
- cors: Cross-origin resource sharing middleware.
- dotenv: Environment variable management.
- express-compression: Middleware for compressing HTTP responses.
- express-handlebars: Templating engine for Express.js.
- handlebars-helpers: Collection of handlebars helpers.
- jsonwebtoken: Library for generating and verifying JSON Web Tokens.
- mongoose: MongoDB object modeling for Node.js.
- mongoose-paginate-v2: Pagination plugin for Mongoose.
- multer: Middleware for handling file uploads in Express.js.
- nodemailer: Library for sending emails.
- passport: Authentication middleware for Node.js.
- passport-github2: Passport strategy for GitHub authentication.
- passport-jwt: Passport strategy for JSON Web Token authentication.
- passport-local: Passport strategy for local username and password authentication.
- socket.io: Library for real-time communication.
- supertest: Library for testing HTTP requests.
- swagger-jsdoc: Library for generating Swagger/OpenAPI documentation from JSDoc comments.
- swagger-ui-express: Middleware for serving Swagger UI.
- toastify-js: Library for displaying toast notifications.
- twilio: Library for sending SMS and making phone calls.
- uuid: Library for generating UUIDs.
- winston: Logging library.
- toastify: Library for displaying toast notifications.
- mercadopago: Library for making payments with MercadoPago.
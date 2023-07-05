# Outfitx

Outfitx is a backend project built with Express.js that provides an API for managing and exploring outfits. This application allows users to create, update, delete, and search for custom outfit sets.

## Deployment

https://outfitx.vercel.app/login => is deprecated.
https://outfitx-production.up.railway.app/login => is working.

## ADMIN USER

- email: admin@coder.com
- password: 123

## Environment Variables (available for the next 30 days)

PORT = 8080
DATA_SOURCE = MONGO # OPTIONS: MONGO - FILE
MONGO_ATLAS_URI = URI OF MONGODB ATLAS
MONGO_LOCAL_URI = URI OF MONGODB LOCAL
GOOGLE_APLICATION_PASSWORD = PASSWORD OF GOOGLE APLICATION
GOOGLE_EMAIL = EMAIL OF GOOGLE ACCOUNT
TWILIO_AUTH_TOKEN = AUTH TOKEN OF TWILIO
TWILIO_ACCOUNT_SID = ACCOUNT SID OF TWILIO
TWILIO_PHONE_NUMBER = PHONE NUMBER OF TWILIO
SECRET_KEY = KEY OF TOKEN
SESSION_KEY = KEY OF SESSION
ADMIN_NAME = THE NAME OF ADMIN
ADMIN_PASSWORD = THE PASSWORD OF ADMIN
GITHUB_CLIENT_ID = CLIENT ID OF GITHUB
GITHUB_CLIENT_SECRET = CLIENT SECRET OF GITHUB
GITHUB_CALLBACK_URL = CALLBACK URL OF GITHUB

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
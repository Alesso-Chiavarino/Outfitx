# Outfitx

Outfitx is a backend project built with Express.js that provides an API for managing and exploring outfits. This application allows users to create, update, delete, and search for custom outfit sets.

## Deployment

## Environment Variables (available for the next 30 days)

PORT = 8080
DATA_SOURCE = MONGO
MONGO_ATLAS_URI = mongodb+srv://alesso-chiavarino:TheAlexOMG14@cluster0.fesuhae.mongodb.net/outfitx?retryWrites=true&w=majority
MONGO_ATLAS_URI_TEST = mongodb+srv://alesso-chiavarino:TheAlexOMG14@cluster0.fesuhae.mongodb.net/outfitx-test?retryWrites=true&w=majority
MONGO_LOCAL_URI = mongodb://localhost:8181/?readPreference=primary&ssl=false&directConnection=true
MONGO_LOCAL_URI_TEST = mongodb://localhost:8282/?readPreference=primary&ssl=false&directConnection=true
GOOGLE_APLICATION_PASSWORD = pekeqzrdurbsmtzf
GOOGLE_EMAIL = jorgeechiavarino@gmail.com
TWILIO_AUTH_TOKEN = 384fa115123f377cc7cb2c4f26680171
TWILIO_ACCOUNT_SID = AC4094ef8e7bf1083e15103f55133cfbf4
TWILIO_PHONE_NUMBER = +12545565939
SECRET_KEY = top-secret-51
SESSION_KEY = outfitx
ADMIN_NAME = alesso-chiavarino
ADMIN_PASSWORD = TheAlexOMG14
GITHUB_CLIENT_ID = Iv1.5afbf0afdffa0ec5
GITHUB_CLIENT_SECRET = e62efbc2956da2cf0c25b1b43d2e412d5e68fff3
GITHUB_CALLBACK_URL = http://localhost:8080/api/session/github/callback

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
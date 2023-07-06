express ===> framework backend
dotenv ===> for enviroment variables
mongoose ===> library for mongodb   
nodemailer ===> to send emails
twilio ===> to send sms
@faker-js/faker --save-dev ===> to generate fake data
bcrypt ===> to encrypt passwords
commander ===> to create command line interfaces
connect-flash ===> to send messages to the views
cookie-parser ===> to manage cookies
express-handlebars ===> to create views
handlebars-helpers ===> to create helpers for handlebars
mongoose-paginate-v2 ===> to paginate data
multer ===> to upload files
passport ===> to manage authentication
passport-github2 ===> to authenticate with github
passport-jwt ===> to authenticate with jwt
passport-local ===> to authenticate with local strategy
socket.io ===> to create websockets
winston ===> to create logs
cors ===> to manage cors
uuid ===> to create random id
swagger-jsdoc ===> to create documentation
swagger-ui-express ===> to add a route to see the documentation
supertest ===> to test the api
jsonwebtoken ===> 
mercadopago ===> to make payments

devDependencies {
    nodemon ===> to restard the server when a file changes
    artillery ===> to make stress tests
    chai ===> to make assertions
    mocha ===> to make unit test
}

--- COMANDS ---
artillery quick --count 40 --num 50 "http://localhost:8080/api/products" -o stadistics.json
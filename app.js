const express = require('express');
const morgan = require('morgan');
const app = express();
const userModel = require('./models/user');  // Importing the user model
const dbConnection = require('./config/db');  // Importing the database connection

app.set("view engine", 'ejs')   // to set the view engine to ejs and render index.ejs file

app.use(morgan('dev'));  // to log the requests in the console [Third Party Middleware]

// Middleware to parse the request body [Built In Middleware]
app.use(express.urlencoded({ extended: true }));  // to parse the form data from the request body
app.use(express.json());  // to parse the JSON data from the request body
app.use(express.static('public'));  // to serve static files from the public directory

// Custom middleware to log requests
// This middleware will log the method and URL of each request
/*
app.use((req, res, next) => {
    console.log("Custom Middleware");
    next();
});
*/

app.get('/', (req, res) => {
    res.render('index');    // render helps to render the index.ejs file
})

app.get('/about', (req, res) => {
    res.send("About Page");
})

app.get('/profile', (req, res) => {
    res.send("Profile Page");
})

// the 'get' method is used to get the data from the server but it shows the data in the URL [server to frontend]
// app.get("/get-form-data", (req, res) => {
//     console.log(req.query);
//     res.send("Form data received");
// })

// the post method is used to send the data to the server and it does not show the data in the URL [frontend to server]
app.post("/get-form-data", (req, res) => {
    console.log(req.body);
    res.send("Form data received");
})


// This route will handle the form submission when the user submits the registration form. It will create a new user in the database with the form data
app.get('/register', (req, res) => {
    res.render('register');  // Render the register.ejs file
})

// Create Operation in MongoDB
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;  // Destructure the form data
    const newUser = await userModel.create({ username: username, email: email, password: password })  // Create a new user in the database
    res.send("User registered successfully");
})

// Read Operation in MongoDB
app.get('/get-users', (req, res) => {
    userModel.find({ username: 'deeapk' }).then((users) => {
        console.log(users);
        res.json(users);  // Send the users as a JSON response
    })
})
app.get('/get-users2', (req, res) => {  // FindOne shows only one user
    userModel.findOne({ username: 'deeapk' }).then((users) => {
        console.log(users);
        res.json(users);  // Send the users as a JSON response
    })
})

// Update Operation in MongoDB
app.get('/update-user', async (req, res) => {
    await userModel.findOneAndUpdate(
        { username: 'user2' }, { email: 'user2@mail.com' }  // Find the user with username 'deeapk' and update their email
    ).then((user) => {
        console.log(user);
        res.send("User updated successfully");
    })
})

// Delete Operation in MongoDB
app.get('/delete-user', async (req, res) => {
    await userModel.findOneAndDelete({ username: 'deeapk' }).then((user) => {  // Find the user with username 'deeapk' and delete them
        console.log(user);
        res.send("User deleted successfully");
    })
});

app.listen(3000);
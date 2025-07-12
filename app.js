const express = require('express');
const morgan = require('morgan');
const app = express();

app.set("view engine", 'ejs')   // to set the view engine to ejs and render index.ejs file

app.use(morgan('dev'));  // to log the requests in the console [Third Party Middleware]

// Middleware to parse the request body [Built In Middleware]
app.use(express.urlencoded({ extended: true }));  // to parse the form data from the request body
app.use(express.json());  // to parse the JSON data from the request body

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

app.listen(3000);
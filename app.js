const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));  // to log the requests in the console
app.set("view engine", 'ejs')   // to render html pages into express server

app.get('/',
    (req, res, next) => {
        console.log("Using custom middleware at /");
        next();  // to pass the request
    },
    
    (req, res) => {
        res.render('index');    // render helps in rendering the page into the given route
    })

app.get('/about', (req, res) => {
    res.send("About Page");
})

app.get('/profile', (req, res) => {
    res.send("Profile Page");
})

app.listen(3000);
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));  // to log the requests in the console
app.set("view engine", 'ejs')   // to render html pages into express server

// Middleware : the request pass through a function everytime it is rendered into the route or while changing the route
// Types of middlewares : built in, custom, third party
app.use((req, res, next) => {   // to pass the request through a function called middleware
    console.log("This is middleware");
    // res.send("Middleware passed!")
    return next()   // to continue to the flow
})

app.get('/', (req, res) => {
    res.render('index');    // render helps in rendering the page into the given route
})
app.get('/about', (req, res) => {
    res.send("About Page");
})
app.get('/profile', (req, res) => {
    res.send("Profile Page");
})

app.listen(3000);
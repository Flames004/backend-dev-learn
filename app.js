const http = require('http');

const server = http.createServer((req,res)=>{
    if (req.url == '/about'){
        res.end("About Page")
    }
    if (req.url == '/profile'){
        res.end("Profile Page")
    }
    if (req.url == '/'){
        res.end("Home Page")
    }

})

server.listen(3000);
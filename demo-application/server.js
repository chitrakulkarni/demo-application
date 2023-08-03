const express = require('express');
const app = express();
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const path = require('path')
dotenv.config()
if (process.env.NODE_ENV === 'dev') {
    dotenv.config({
        path: path.join(__dirname, '/.env.dev')
    });
} else if (process.env.NODE_ENV === 'prod') {
    dotenv.config({
        path: path.join(__dirname, '/.env.prod')
    });
} else if (process.env.NODE_ENV === 'preprod') {
    dotenv.config({
        path: path.join(__dirname, '/.env.preprod')
    });
} else {
    dotenv.config({
        path: path.join(__dirname, '/.env.dev')
    });
}


// use body parser so we can get info from POST and/or URL parameters
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: 1024102420, type: 'application/json' }));

// // setup the morgan logger to log into the file
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan('combined', { stream: accessLogStream }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//send response to show health status on aws
app.get("/", (req, res) => {
    res.send(` <h3> Yodda Test Backend Platform ${process.env.NODE_ENV}</h3> `)
})

server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

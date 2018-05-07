// Requires
const express = require('express');
const bodyParser = require('body-parser');
const listingRouter = require('./routes/listing.router')

// Create app
const app = express();

// Assign port
const PORT = 5002;

// Serve static files=
app.use(express.static('server/public'));

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes will go here
app.use('/listing', listingRouter);


// Set port to listen
app.listen(PORT, () => {
    console.log (`Listening on port ${PORT}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const PORT = 5002;

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes will go here


app.listen(PORT, () => {
    console.log (`Listening on port ${PORT}`);
});
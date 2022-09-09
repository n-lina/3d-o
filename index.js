const express = require('express');


require('dotenv').config();

// create express server
const app = express();
app.use(express.static('frontend/build'));
const port = process.env.PORT || 5000;

const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// cors middleware
app.use(express.json()); // parse json

// starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
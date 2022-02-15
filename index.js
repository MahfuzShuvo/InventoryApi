const express = require('express');
const cors = require('cors');
const mongoose = require('./database/config');
const bodyParser = require('body-parser');
const customersRoute = require('./src/routes/customer.route');

const PORT = process.env.PORT | 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Policy
app.use(cors());

// routes
app.use('/api/customers', customersRoute);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSebt) {
        return next(err);
    }
    res.status(500).json({error: err});
}

// Listening server
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
})
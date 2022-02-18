const express = require('express');
const cors = require('cors');
const mongoose = require('./database/config');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const customersRoute = require('./src/routes/customer.route');
const systemUserRoute = require('./src/routes/systemUser.route');

const PORT = process.env.PORT | 3000;
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Policy
app.use(cors());

// routes
app.use('/api/customer', customersRoute);
app.use('/api/systemUser', systemUserRoute);

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSebt) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.use(errorHandler);

// Listening server
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
})
const express = require('express');
const cors = require('cors');
const mongoose = require('./database/config');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Authguard = require('./middleware/auth.guard');
// routes import
const customerRoute = require('./src/routes/customer.route');
const supplierRoute = require('./src/routes/supplier.route');
const categoryRoute = require('./src/routes/category.route');
const systemUserRoute = require('./src/routes/systemUser.route');

const PORT = process.env.PORT | 3000;
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Policy
app.use(cors());

// routes
app.use('/api/systemUser', systemUserRoute);
app.use('/api/customer', Authguard, customerRoute);
app.use('/api/supplier', Authguard, supplierRoute);
app.use('/api/category', Authguard, categoryRoute);

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
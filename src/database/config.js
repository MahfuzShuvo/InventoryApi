const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION)
    .then(() => console.log('Database connection established'))
    .catch((err) => console.log('Error: ',err));

module.exports = mongoose;
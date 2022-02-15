const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, unique: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    address: [
        {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            zip: { type: String, trim: true },
        }
    ],
    image: { type: String, trim: true },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('category', CategorySchema);
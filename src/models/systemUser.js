const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SystemUserSchema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    userName: { type: String, required: true, unique: true, trim: true },
    password: { 
        type: String, 
        required: true, 
        minlength: 8 
    },
    userType: {
        type: String,
        enum: ["admin", "manager", "staff"],
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

const SystemUser = mongoose.model('SystemUser', SystemUserSchema);
module.exports = SystemUser;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true, trim: true },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    status: Boolean
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
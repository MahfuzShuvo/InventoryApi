const Category = require('../models/category');

/**
 * GET /category
 * Purpose: Get all categories
 */
getAllCategory = (req, res) => {
    const category = Category.find();
    
    category.then(data => {
        res.status(200).json({
            status: true,
            responseObj: data,
            length: data.length
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            error: err
        });
    });
};

/**
 * GET /category/:id
 * Purpose: Get a specific category by :id
 */
getCategoryByID = (req, res) => {
    Category.find({ _id: req.params.id })
            .then(data => {
                res.status(200).json({
                    status: true,
                    responseObj: data
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    error: err
                });
            });
};

/**
 * POST /category
 * Purpose: Create a category
 */
createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save()
            .then(data => {
                res.status(200).json({
                    status: true,
                    responseObj: data,
                    message: 'Category added successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    error: err
                });
            });
};

/**
 * POST /category/all
 * Purpose: Create multiple categories
 */
createAllCategory = (req, res) => {
    Category.insertMany(req.body)
            .then(data => {
                res.status(200).json({
                    status: true,
                    responseObj: data,
                    message: 'Categories are added successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    error: 'Opps! This is a server error'
                });
            });
};

/**
 * PUT /category/:id
 * Purpose: Edit a specific category by :id
 */
updateCategory = (req, res) => {
    Category.findByIdAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        useFindAndModify: false
    }).then(data => {
        res.status(200).json({
            status: true,
            responseObj: data,
            message: 'Category updated successfully'
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            error: 'Opps! This is a server error'
        });
    });
};

/**
 * DELETE /category/:id
 * Purpose: Delete a specific category by :id
 */
deleteCategory = (req, res) => {
    Category.findByIdAndDelete({ _id: req.params.id })
            .then(data => {
                res.status(200).json({
                    status: true,
                    message: 'Category deleted successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    error: err
                });
            });
};

module.exports = {
    getAllCategory, getCategoryByID, createCategory, createAllCategory, updateCategory, deleteCategory
}
const Supplier = require('../models/supplier');

/**
 * GET /supplier
 * Purpose: Get all suppliers
 */
getAllSupplier = (req, res) => {
    const supplier = Supplier.find().populate('createdBy', 'firstName lastName userName phone userType');
    
    supplier.then(data => {
        res.status(200).json({
            status: true,
            responseCode: 200,
            responseObj: data,
            length: data.length
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            responseCode: 500,
            message: "This is server error",
            error: err
        });
    });
};

/**
 * GET /supplier/:id
 * Purpose: Get a specific supplier by :id
 */
getSupplierByID = (req, res) => {
    Supplier.find({ _id: req.params.id })
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
 * POST /supplier/create
 * Purpose: Create a supplier
 */
createSupplier = async (req, res) => {
    const supplier = new Supplier({
        ...req.body,
        createdBy: req.userId
    });
    try {
        var data = await supplier.save();
        res.status(200).json({
            status: true,
            responseCode: 200,
            responseObj: data,
            message: 'Supplier added successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            responseCode: 500,
            message: 'Oops! Something went wrong',
            error: err
        });
    }
};

/**
 * POST /supplier/create/all
 * Purpose: Create multiple suppliers
 */
createAllSupplier = (req, res) => {
    Supplier.insertMany(req.body)
            .then(data => {
                res.status(200).json({
                    status: true,
                    responseObj: data,
                    message: 'Suppliers are added successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    error: 'Opps! This is a server error'
                });
            });
};

/**
 * POST /supplier/update/:id
 * Purpose: Edit a specific supplier by :id
 */
updateSupplier = (req, res) => {
    Supplier.findByIdAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        useFindAndModify: false
    }).then(data => {
        res.status(200).json({
            status: true,
            responseCode: 200,
            responseObj: data,
            message: 'Supplier updated successfully'
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            responseCode: 500,
            message: 'Opps! This is a server error',
            error: err
        });
    });
};

/**
 * POST /supplier/delete/:id
 * Purpose: Delete a specific supplier by :id
 */
deleteSupplier = (req, res) => {
    Supplier.findByIdAndDelete({ _id: req.params.id })
            .then(data => {
                res.status(200).json({
                    status: true,
                    responseCode: 200,
                    message: 'Supplier deleted successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    responseCode: 200,
                    message: 'Opps! Something went wrong',
                    error: err
                });
            });
};

module.exports = {
    getAllSupplier, getSupplierByID, createSupplier, createAllSupplier, updateSupplier, deleteSupplier
}
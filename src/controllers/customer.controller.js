const Customer = require('../models/customer');
const _ = require('lodash');

/**
 * GET /customer
 * Purpose: Get all customers
 */
getAllCustomer = (req, res) => {
    const customer = Customer.find().populate('createdBy', 'firstName lastName userName phone userType');
    
    customer.then(data => {
        res.status(200).json({
            status: true,
            responseCode: 200,
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
 * GET /customer/:id
 * Purpose: Get a specific customer by :id
 */
getCustomerByID = (req, res) => {
    Customer.find({ _id: req.params.id })
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
 * POST /customer
 * Purpose: Create a customer
 */
createCustomer = async (req, res) => {
    const customer = new Customer({
        ...req.body,
        createdBy: req.userId
    });
    try {
        var data = await customer.save();
        res.status(200).json({
            status: true,
            responseCode: 200,
            responseObj: data,
            message: 'Customer added successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            responseCode: 500,
            message: 'Oops! Something went wrong',
            error: err
        });
    }
    // customer.save()
    //         .then(data => {
    //             res.status(200).json({
    //                 status: true,
    //                 responseCode: 200,
    //                 responseObj: data,
    //                 message: 'Customer added successfully'
    //             });
    //         }).catch(err => {
                
    //         });
};

/**
 * POST /customer/all
 * Purpose: Create multiple customers
 */
createAllCustomer = (req, res) => {
    Customer.insertMany(req.body)
            .then(data => {
                res.status(200).json({
                    status: true,
                    responseObj: data,
                    message: 'Customers are added successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    error: 'Opps! This is a server error'
                });
            });
};

/**
 * PUT /customer/:id
 * Purpose: Edit a specific customer by :id
 */
updateCustomer = (req, res) => {
    Customer.findByIdAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        useFindAndModify: false
    }).then(data => {
        res.status(200).json({
            status: true,
            responseCode: 200,
            responseObj: data,
            message: 'Customer updated successfully'
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
 * DELETE /customer/:id
 * Purpose: Delete a specific customer by :id
 */
deleteCustomer = (req, res) => {
    Customer.findByIdAndDelete({ _id: req.params.id })
            .then(data => {
                res.status(200).json({
                    status: true,
                    responseCode: 200,
                    message: 'Customer deleted successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    responseCode: 500,
                    error: err
                });
            });
};

module.exports = {
    getAllCustomer, getCustomerByID, createCustomer, createAllCustomer, updateCustomer, deleteCustomer
}
const Customer = require('../models/customer');

/**
 * GET /customers
 * Purpose: Get all customers
 */
getAllCustomers = (req, res) => {
    console.log('Username', req.userName);
    console.log('UserID', req.userId);
    const customer = Customer.find();
    customer.then(data => {
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
 * GET /customers/:id
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
 * POST /customers
 * Purpose: Create a customer
 */
createCustomer = (req, res) => {
    const customer = new Customer(req.body);
    customer.save()
            .then(data => {
                res.status(200).json({
                    status: true,
                    responseObj: data,
                    message: 'Customer added successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    error: err
                });
            });
};

/**
 * GET /customers/all
 * Purpose: Create multiple customers
 */
createAllCustomers = (req, res) => {
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
 * PUT /customers/:id
 * Purpose: Edit a specific customer by :id
 */
updateCustomer = (req, res) => {
    Customer.findByIdAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        useFindAndModify: false
    }).then(data => {
        res.status(200).json({
            status: true,
            responseObj: data,
            message: 'Customer updated successfully'
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            error: 'Opps! This is a server error'
        });
    });
};

/**
 * DELETE /customers/:id
 * Purpose: Delete a specific customer by :id
 */
deleteCustomer = (req, res) => {
    Customer.findByIdAndDelete({ _id: req.params.id })
            .then(data => {
                res.status(200).json({
                    status: true,
                    message: 'Customer deleted successfully'
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    error: err
                });
            });
};

module.exports = {
    getAllCustomers, getCustomerByID, createCustomer, createAllCustomers, updateCustomer, deleteCustomer
}
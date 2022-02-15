const Customer = require('../models/customer');

getAllCustomers = async (req, res) => {
    try {
        await Customer.find({ status: true })
            .then(data => {
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
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }
};

// GET A CUSTOMER :ID
getCustomerByID = async (req, res) => {
    try {
        await Customer.find({ _id: req.params.id })
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
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }
};

// POST CUSTOMER
createCustomer = async (req, res) => {
    const customer = new Customer(req.body);
    try {
        await customer.save()
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
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }
};

// POST MULTIPLE CUSTOMER
createAllCustomers = async (req, res) => {
    try {
        await Customer.insertMany(req.body)
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
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }
};

// PUT CUSTOMER for UPDATE :ID
updateCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate({_id: req.params.id}, req.body, {
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
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }
};

// DELETE CUSTOMER :ID
deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete({ _id: req.params.id })
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
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerByID,
    createCustomer,
    createAllCustomers,
    updateCustomer,
    deleteCustomer
}
const express = require("express");
const router = express.Router();
const customers = require('../controllers/customer.controller')

// GET ALL THE CUSTOMERS
router.get('/', customers.getAllCustomers);


router.get('/:id', customers.getCustomerByID);


router.post('/', customers.createCustomer);


router.post('/all', customers.createAllCustomers);


router.put('/:id', customers.updateCustomer);


router.delete('/:id', customers.deleteCustomer);

module.exports = router;
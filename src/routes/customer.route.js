const express = require("express");
const router = express.Router();
const customers = require('../controllers/customer.controller')
const Authguard = require('../../middleware/auth.guard');


router.get('/', Authguard, customers.getAllCustomers);

router.get('/:id', customers.getCustomerByID);

router.post('/', customers.createCustomer);

router.post('/all', customers.createAllCustomers);

router.put('/:id', customers.updateCustomer);

router.delete('/:id', customers.deleteCustomer);


module.exports = router;
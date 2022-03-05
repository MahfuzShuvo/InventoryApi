const express = require("express");
const router = express.Router();
const customer = require('../controllers/customer.controller');


router.get('/', customer.getAllCustomer);

router.get('/:id', customer.getCustomerByID);

router.post('/create', customer.createCustomer);

router.post('/all', customer.createAllCustomer);

router.post('/update/:id', customer.updateCustomer);

router.post('/delete/:id', customer.deleteCustomer);


module.exports = router;
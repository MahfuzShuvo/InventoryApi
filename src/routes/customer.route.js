const express = require("express");
const router = express.Router();
const customer = require('../controllers/customer.controller');


router.get('/', customer.getAllCustomer);

router.get('/:id', customer.getCustomerByID);

router.post('/', customer.createCustomer);

router.post('/all', customer.createAllCustomer);

router.put('/:id', customer.updateCustomer);

router.delete('/:id', customer.deleteCustomer);


module.exports = router;
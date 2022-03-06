const express = require("express");
const router = express.Router();
const supplier = require('../controllers/supplier.controller');


router.get('/', supplier.getAllSupplier);

router.get('/:id', supplier.getSupplierByID);

router.post('/create', supplier.createSupplier);

router.post('/create/all', supplier.createAllSupplier);

router.post('/update/:id', supplier.updateSupplier);

router.post('/delete/:id', supplier.deleteSupplier);


module.exports = router;
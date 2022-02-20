const express = require("express");
const router = express.Router();
const supplier = require('../controllers/supplier.controller');


router.get('/', supplier.getAllSupplier);

router.get('/:id', supplier.getSupplierByID);

router.post('/', supplier.createSupplier);

router.post('/all', supplier.createAllSupplier);

router.put('/:id', supplier.updateSupplier);

router.delete('/:id', supplier.deleteSupplier);


module.exports = router;
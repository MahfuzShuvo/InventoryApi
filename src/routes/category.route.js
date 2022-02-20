const express = require("express");
const router = express.Router();
const category = require('../controllers/category.controller');


router.get('/', category.getAllCategory);

router.get('/:id', category.getCategoryByID);

router.post('/', category.createCategory);

router.post('/all', category.createAllCategory);

router.put('/:id', category.updateCategory);

router.delete('/:id', category.deleteCategory);


module.exports = router;
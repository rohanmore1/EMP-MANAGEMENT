
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');


router.route('/')
  .get(employeeController.findAll)
  .post(employeeController.create);


router.route('/:id')
  .get(employeeController.findOne)
  .put(employeeController.update)
  .delete(employeeController.delete);

module.exports = router;
// server/controllers/employee.controller.js
const Employee = require('../models/employee.model');


exports.create = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
 
    res.status(400).json({ 
      message: 'Failed to create employee', 
      error: err.message 
    });
  }
};


exports.findAll = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error retrieving employees', 
      error: err.message 
    });
  }
};


exports.findOne = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    
    res.status(500).json({ 
      message: 'Error retrieving employee', 
      error: err.message 
    });
  }
};

// --- UPDATE ---
exports.update = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // {new: true} returns the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ 
      message: 'Failed to update employee', 
      error: err.message 
    });
  }
};


exports.delete = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ 
      message: 'Could not delete employee', 
      error: err.message 
    });
  }
};
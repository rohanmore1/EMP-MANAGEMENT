const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employee.routes');

const app = express();
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/employeeDB';

mongoose.connect(DB_URL)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit();
  });

const corsOptions = {
    origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Employee Management Backend API is running.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// src/app/models/employee.model.ts
export interface Employee {
  _id: string; // Changed from number/id to string/_id to match MongoDB
  name: string;
  email: string;
  department: string; 
}
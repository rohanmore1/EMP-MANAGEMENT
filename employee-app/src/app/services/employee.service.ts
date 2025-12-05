// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Point to the base URL of your Express API
  private apiUrl = 'http://localhost:3000/api/employees'; 

  constructor(private http: HttpClient) { }

  // --- READ ALL (GET) ---
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // --- READ ONE (GET /:id) ---
  // Note: The backend uses the MongoDB '_id' field, so we use string here.
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // --- CREATE (POST) ---
  addEmployee(employee: Omit<Employee, '_id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // --- UPDATE (PUT /:id) ---
  updateEmployee(employee: Employee): Observable<any> {
    // We send the full employee object, but the ID is used in the URL
    return this.http.put(`${this.apiUrl}/${employee._id}`, employee);
  }

  // --- DELETE (DELETE /:id) ---
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
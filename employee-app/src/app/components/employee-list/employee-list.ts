import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './employee-list.html', 
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(
    private employeeService: EmployeeService, 
    public router: Router,
    private cdr: ChangeDetectorRef, // Added for manual change detection
    private toastr: ToastrService
  ) { } 

  ngOnInit(): void {
    this.loadEmployees();
  }

  // FIXED: Better error handling and change detection
  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('Employees loaded:', data); // Debug log
        this.employees = data || []; // Handle null/undefined
        this.filteredEmployees = [...this.employees]; // Create new array reference
        this.isLoading = false;
        this.cdr.detectChanges(); // Force change detection
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.employees = [];
        this.filteredEmployees = [];
        this.toastr.error('Failed to load employees', 'Error');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

deleteEmployee(id: string): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this employee?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Employee deleted successfully!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });

          this.loadEmployees(); // refresh list
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete employee. Please try again.',
            icon: 'error'
          });
        }
      });
    }
  });
}


  editEmployee(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  // FIXED: Properly handle search with array reference
  searchEmployees(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredEmployees = [...this.employees]; // Create new array reference
    } else {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.name.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.department.toLowerCase().includes(term)
      );
    }
    this.cdr.detectChanges(); // Trigger change detection
  }

  // Add method to manually refresh if needed
  refreshList(): void {
    this.searchTerm = '';
    this.loadEmployees();
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId: string | null = null;
  formTitle = 'Add New Employee';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      _id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.employeeId = idParam;
        this.isEditMode = true;
        this.formTitle = 'Edit Employee';
        this.loadEmployeeData(this.employeeId);
      }
    });
  }

  loadEmployeeData(id: string): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        if (employee) {
          this.employeeForm.patchValue(employee);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => console.error('Error fetching employee data:', err)
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.toastr.warning('Please fix validation errors.');
      return;
    }

    const employeeData: Employee = this.employeeForm.value as Employee;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(employeeData).subscribe({
        next: () => {
          this.toastr.success('Employee updated successfully!', 'Updated');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error updating employee:', err)
      });
    } else {
      const { _id, ...newEmployee } = employeeData;

      this.employeeService.addEmployee(newEmployee).subscribe({
        next: () => {
          this.toastr.success(`Employee ${newEmployee.name} added!`, 'Success');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error adding employee:', err)
      });
    }
  }

  get f() { return this.employeeForm.controls; }
}
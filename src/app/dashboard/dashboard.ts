import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employeeService';

interface Employee {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  departmentId: number;
  salary: string;
  departmentName: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  searchTerm = '';
  showAddForm = false;
  totalRecords: number = 0;
  employees: Employee[] = [];
  departments: any[] = [];
  employeeForm: FormGroup;
  showDropdown = false;

  constructor(private readonly  fb: FormBuilder, 
    private readonly cdr: ChangeDetectorRef,
    private readonly employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      role: [''],
      department: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit(): void {    
    this.getDepartments();
    this.getAllEmployees();
  }

  selectDepartment(dept: any) {
    this.employeeForm.patchValue({
      department: dept
    });
    this.showDropdown = false;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.employeeForm.reset();
    }
  }

  getDepartments(): void{
    this.employeeService.getDepartments().subscribe((res: any) =>{
      this.departments = res || [];      
    })
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: any) => {
        this.employees = res?.employees ? [...res.employees] : [];
        this.totalRecords = res?.totalRecords ?? 0;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load employees', err);
        this.employees = [];
        this.totalRecords = 0;
      }
    });
  }

  addEmployee(): void {
    if (this.employeeForm.invalid) return;
    const formValue = this.employeeForm.value;
    
    const payload = {
      name: formValue.name,
      address: formValue.address,
      email: formValue.email,
      departmentId: formValue.department.id,
      salary: formValue.salary,
      role: formValue.role
    };

    if (formValue.id) {
      const updatedPayload = {
        ...payload,
        id: formValue.id
      }
      this.employeeService.updateEmployee(updatedPayload)
        .subscribe(() => {
          this.employeeForm.reset();
        this.showAddForm = false;
        this.getAllEmployees();
        });
    } else {
      this.employeeService.createEmployee(payload)
        .subscribe(() => {
          this.employeeForm.reset();
        this.showAddForm = false;
        this.getAllEmployees();
        });
    }
  }

  editEmployee(employee: any) {
    this.showAddForm = true;
    this.employeeForm.patchValue({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      address: employee.address,
      role: employee.role,
      salary: employee.salary,
      department: {
        id: employee.departmentId,
        name: employee.departmentName
      }
    });
  }

  deleteEmployee(id: number) {
    if (!confirm('Are you sure you want to delete?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e.id !== id);
      }
    });
  }
}
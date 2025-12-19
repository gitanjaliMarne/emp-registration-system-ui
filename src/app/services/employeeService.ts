import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private readonly  http: HttpClient) {}

  getAllEmployees(): Observable<any>{
    return this.http.get(`${api}/employees`);
  }

  getDepartments(): Observable<any>{
    return this.http.get(`${api}/department`);
  }

  createEmployee(payload: any): Observable<any> {
    return this.http.post(`${api}/employees`, payload);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${api}/employees/${id}`);
  }

  updateEmployee(payload: any): Observable<any> {
    return this.http.put(`${api}/employees`, payload);
  }
}

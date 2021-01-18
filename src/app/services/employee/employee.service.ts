import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public EMPLOYEE_API = 'http://localhost:3000/api/employees';
  constructor(private http: HttpClient) { }

  getAll (): Observable<any>{
    return this.http.get(this.EMPLOYEE_API + '/');
  }

  get (id: string) {
    return this.http.get(this.EMPLOYEE_API + '/employee/' + id);
  }

  createEmployee (employee: any): Observable<any> {
    return this.http.post(this.EMPLOYEE_API, employee);
  }

  updateEmployee (employee: any) {
    return this.http.put(this.EMPLOYEE_API + '/employee/' + employee._id, employee);
  }

  deleteEmployee (employee:any) {
    return this.http.delete(this.EMPLOYEE_API + '/employee/' + employee._id, employee)
  }
}

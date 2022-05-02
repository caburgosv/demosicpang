import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsemployeesService {

  private API_SERVER = "http://localhost:8080/departmentEmployeWs/";

  constructor(private httpClient: HttpClient) { }

  public getAllDepartmentsEmployeesService(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveDepartmentEmploye (departmentemploye:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,departmentemploye);
  }

  public deleteDepartmentEmploye(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}

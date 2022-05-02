import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private API_SERVER = "http://localhost:8080/departmetWs/";

  constructor(private httpClient: HttpClient) { }

  public getAllDepartments(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveDepartment (persona:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,persona);
  }

  public deleteDepartment(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}

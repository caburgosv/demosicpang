import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private API_SERVER = "http://localhost:8080/employeWs/";

  constructor(private httpClient: HttpClient) { }

  public getAllEmployees(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveEmploye (employe:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,employe);
  }

  public deleteEmploye(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}

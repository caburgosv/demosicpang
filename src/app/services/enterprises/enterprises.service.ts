import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnterprisesService {

  private API_SERVER = "http://localhost:8080/enterpriseWs/";

  constructor(private httpClient: HttpClient) { }

  public getAllEnterprises(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveEnterprise (enterprise:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,enterprise);
  }

  public deleteEnterprise(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    private apiUrl = 'http://127.0.0.1:8000/api/Candidatedata';
    private apiUrlreg = 'http://127.0.0.1:8000/api/reg';
    private apiUrldelete = 'http://127.0.0.1:8000/api/Candidatedelete';

 
  constructor(private http: HttpClient) {}
 
  candidatedata(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  createRegister(updateid:number,candidatedata: any): Observable<any> {
    const requestBody = { updateid,candidatedata };
    return this.http.post(this.apiUrlreg, requestBody);
  }
  deletecandidate(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrldelete}/${id}/`);
  }
  

}
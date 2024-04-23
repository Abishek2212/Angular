import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class StatusService {
    private apiUrl = 'http://127.0.0.1:8000/api/Candidatedata';
    private apiUrlpositionstatus = 'http://127.0.0.1:8000/api/positionstatus';
    private apiUrlpositionselect = 'http://127.0.0.1:8000/api/positionselect';
    private apiUrlsubmit=  'http://127.0.0.1:8000/api/positionsubmit';
  constructor(private http: HttpClient) {}
 
  candidatedata(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  positionstatus(): Observable<any> {
    return this.http.get<any>(this.apiUrlpositionstatus);
  }

  select(PositionId:number): Observable<any> {
    return this.http.get(`${this.apiUrlpositionselect}/${PositionId}/`);
  }

  submit(id:number,Fullname: any,selectedRound:any,selectedStatus:any): Observable<any> {
    const requestBody = { id,Fullname,selectedRound,selectedStatus };
    return this.http.post(this.apiUrlsubmit, requestBody);
  }
}
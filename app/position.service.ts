import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class PositionService {
    private apiUrl = 'http://127.0.0.1:8000/api/positiondata';
    private apiUrlposition = 'http://127.0.0.1:8000/api/position';
    private apiUrldelete = 'http://127.0.0.1:8000/api/positiondelete';
    private apiUrlupdate = 'http://127.0.0.1:8000/api/positionupdate';
 
  constructor(private http: HttpClient) {}
 
  getPositionData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  createposition(positionName: any, positionDescription: any,interviewStages:any): Observable<any> {
    const requestBody = { positionName, positionDescription,interviewStages };
    return this.http.post(this.apiUrlposition, requestBody);
  }
  updateposition(id: number, name: any,Description:any,InterviewStage:any): Observable<any> {
    const requestBody = { name, Description, InterviewStage };
    return this.http.post(`${this.apiUrlupdate}/${id}/`, requestBody);
  }
  deleteposition(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrldelete}/${id}/`);
  }
}
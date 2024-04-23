import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
  
})
export class InterviewService {
  private apiUrl = 'http://127.0.0.1:8000/api/interviewdata';
  private apiUrlcreate = 'http://127.0.0.1:8000/api/createinterview';
  private apiUrlupdate = 'http://127.0.0.1:8000/api/updateinterview';
  private apiUrldelete = 'http://127.0.0.1:8000/api/deleteinterview';


  constructor(private http: HttpClient) {}

  getInterviews(): Observable<any> {

    return this.http.get(this.apiUrl);
  }
 
  createInterview(interviewname: any): Observable<any> {
    return this.http.post(this.apiUrlcreate, interviewname);
  }
 
  updateInterview(id: number, interviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrlupdate}/${id}/`, interviewData);
  }

  deleteInterview(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrldelete}/${id}/`);
  }
}
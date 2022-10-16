import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }
  apiURL = `http://localhost:3000`;
  constructor(private http: HttpClient) { }

  getUser(userId):Observable<any>{
    return this.http.get(this.apiURL+'/alumnos/'+userId).pipe(
      retry(3)
    );
  }
  getUsers():Observable<any>{
    return this.http.get(this.apiURL+'/alumnos/').pipe(
      retry(3)
    );
  }

  getDatos(userId, username):Observable<any>{
    return this.http.get(this.apiURL+'/alumnnos/'+userId+username).pipe(
      retry(3)
    );
  }
  
}

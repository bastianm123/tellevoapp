import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { RespuestaAlumnos } from '../ialumnos';

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
  apiURL = `https://nancyb3a.github.io/Test/usuarios_PGY4121_01.json`;
  usuarios:any=[];
  constructor(private http: HttpClient) { }

  getUser(userId):Observable<any>{
    return this.http.get(this.apiURL+userId).pipe(
      retry(3)
    );
  }
  getUsers():Observable<any>{
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
  }

  getUsuarios():Observable<RespuestaAlumnos>{
    return this.http.get<RespuestaAlumnos>(this.apiURL).pipe(
      retry(3)
    );
  }

  getLogin(username,password):Observable<any>{
    return this.http.get(this.apiURL+username+password).pipe(
      retry(3)
      );
  }

}

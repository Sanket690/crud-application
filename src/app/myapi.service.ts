import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyapiService {

  constructor( private http:HttpClient ) { }


  addEmployee(userData: any) {
    let httpHeaders = new HttpHeaders({
      'content-type' : 'application/json'
    })

    return this.http.post('http://127.0.0.1:3000/post', userData, {headers: httpHeaders});
  }

  
  //Update Data
  editEmp(name: string, data: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:3000/put/${name}`, data);
  }


  //Get Data
  getData(){
    return this.http.get('http://127.0.0.1:3000/get');
  }


  
  //Delete
  private apiUrl = 'http://127.0.0.1:3000/del';
  deleteEmp(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`);
  }

}

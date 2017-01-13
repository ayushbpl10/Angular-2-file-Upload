import {Injectable} from '@angular/core';
import {Http, Headers , Response} from '@angular/http';
import 'rxjs/Rx';
 @Injectable()

 export class HttpService{
     constructor(private http: Http){}

 getData(){
     
     return this.http.get('http://localhost:4300/')
     .map((data: Response) => data.json());

 }

  deleteData(filename:any){
     
     return this.http.post('http://localhost:4500/',filename)
     .map((data: Response) => data.json());

 }

 }
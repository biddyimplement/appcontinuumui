import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  http:any;
  constructor(http:HttpClient) {
    this.http =http;
   }

  url = "http://localhost:8080/application/continuum/api/v1/generate";
  downloadFile(data: object) {
    return this.http.post(this.url,data, {
      responseType: 'arraybuffer'
    });
  }
  
  projectData:object;

  setprojectData(data){
    this.projectData=data;
  }
  getprojectData(){
    return this.projectData;
  }
}

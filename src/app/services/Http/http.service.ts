import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  postMethod(reqUrl:any, reqData:any, token:boolean=false,httpOptions:any={}){
    return this.http.post(reqUrl,reqData,token&& httpOptions)
  }

  postMethodToken(reqUrl:any, reqData:any, token:boolean=true,httpOptions:any={}){
    return this.http.post(reqUrl,reqData,token&& httpOptions)
  }
  getService(reqUrl:any,  token:boolean=true,httpOptions:any={}){
    return this.http.get(reqUrl, token&& httpOptions)
  }
  putService(reqUrl: any, reqData: any, token: boolean = true, httpOptions: any = {}) {
    return this.http.put(reqUrl, reqData, httpOptions);  // Remove 'token&&'
  }
  
  deleteServie(reqUrl:any, token:boolean=true,httpOptions:any={}){
    return this.http.delete(reqUrl,token && httpOptions)
  }
}

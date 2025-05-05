import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }
  login(reqData: any) {

    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json'
        })
    }
    return this.httpService.postMethod('https://localhost:7130/api/user/login', reqData, false, header)

  }
  register(reqData: any) {

    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json'
        })
    }
    return this.httpService.postMethod('https://localhost:7130/api/user', reqData, false, header)
  }

}

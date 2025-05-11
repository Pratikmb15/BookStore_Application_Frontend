import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
token:any;
   constructor(private httpService: HttpService) {
        this.token = localStorage.getItem('token')
        if (!this.token) {
          console.error(" No token found! User might not be logged in.");
        } else {
          console.log(" Token found:", this.token);
        }
      }

      addOrder(reqData:any){
        let header = {
          headers: new HttpHeaders(
            {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${this.token}`
    
            })
        }
        return this.httpService.postMethodToken('https://localhost:7130/api/order',reqData,true,header);
      }
      getOrders(){
        let header = {
          headers: new HttpHeaders(
            {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${this.token}`
    
            })
        }
        return this.httpService.getService('https://localhost:7130/api/order',true,header)
      }

}

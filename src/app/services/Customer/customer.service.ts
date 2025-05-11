import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
token:any
  constructor(private httpService: HttpService) {
      this.token = localStorage.getItem('token')
      if (!this.token) {
        console.error(" No token found! User might not be logged in.");
      } else {
        console.log(" Token found:", this.token);
      }
    }
    addCustomerDetails(reqData:any){
      let header = {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          })
      }
      return this.httpService.postMethodToken('https://localhost:7130/api/customer',reqData,true,header);
    }
    getCustomerData(){
      let header = {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          })
      }
      return this.httpService.getService('https://localhost:7130/api/customer/getCustomerId',true,header)
    }
    updateCustomerDetails(customerId:number,reqData:any){
      let header = {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          })
      }
      return this.httpService.putService(`https://localhost:7130/api/customer/${customerId}`,reqData,true,header)
    }

}

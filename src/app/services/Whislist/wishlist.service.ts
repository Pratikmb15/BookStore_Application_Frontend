import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
token:any;
   constructor(private httpService: HttpService) {
        this.token = localStorage.getItem('token')
        if (!this.token) {
          console.error(" No token found! User might not be logged in.");
        } else {
          console.log(" Token found:", this.token);
        }
      }
      addItemToWishList(reqData:any){
        let header = {
          headers: new HttpHeaders(
            {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${this.token}`
    
            })
        }
        return this.httpService.postMethodToken('https://localhost:7130/api/wishList',reqData,true,header);
      }
      getWishListItems(){
        let header = {
          headers: new HttpHeaders(
            {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${this.token}`
    
            })
        }
        return this.httpService.getService('https://localhost:7130/api/wishList',true,header)
      }
      removeWishlistItem(wishListItemId :number){
        let header = {
          headers: new HttpHeaders(
            {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${this.token}`
    
            })
        }
        return this.httpService.deleteServie(`https://localhost:7130/api/wishList/${wishListItemId}`,true,header)
      }
}

import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartQuantity = new BehaviorSubject<number>(0);
  token: any;

   constructor(private httpService: HttpService) {
      this.token = localStorage.getItem('token')
      if (!this.token) {
        console.error(" No token found! User might not be logged in.");
      } else {
        console.log(" Token found:", this.token);
      }
    }
    // Observable that components can subscribe to
  cartQuantity$ = this.cartQuantity.asObservable();

  // Update method
  updateCartQuantity(quantity: number) {
    this.cartQuantity.next(quantity);
  }
    addBookToCart(reqData:any){
      let header = {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
  
          })
      }
      return this.httpService.postMethodToken('https://localhost:7130/api/Cart',reqData,true,header);
    }
    updateCart(cartId:number,reqData:any){
      let header = {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
  
          })
      }
      return this.httpService.putService(`https://localhost:7130/api/Cart/${cartId}`,reqData,true,header);
    }
    getCartIdByBookId(bookId:number){
      let header = {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
  
          })
      }
      return this.httpService.getService(`https://localhost:7130/api/Cart/getCartIdBy/${bookId}`,true,header);
    }
    deleteCartItem(cartId:number){
      let header = {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
  
          })
      }
      return this.httpService.deleteServie(`https://localhost:7130/api/Cart/${cartId}`,true,header);
    }
     getAllIemsInCart(){
      let header = {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
  
          })
      }
      return this.httpService.getService('https://localhost:7130/api/Cart',true,header);
    }
}

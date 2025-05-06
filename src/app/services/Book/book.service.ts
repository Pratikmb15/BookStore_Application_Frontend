import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token')
    if (!this.token) {
      console.error(" No token found! User might not be logged in.");
    } else {
      console.log(" Token found:", this.token);
    }
  }

  getAllBooks() {
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`

        })
    }
    return this.httpService.getService('https://localhost:7130/api/book',true,header);
  }
  getBooksByPage(pageNumber:number){
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`

        })
    }
    return this.httpService.getService(`https://localhost:7130/api/book/pagination?pageNumber=${pageNumber}`,true,header);
  }
  sortBooks(order:boolean=true){
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`

        })
    }
    return this.httpService.getService(`https://localhost:7130/api/book/sort?sortBy=${order}`,true,header);
    
  }
  searchBook(searchText:string){
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.token}`

        })
    }
    return this.httpService.getService(`https://localhost:7130/api/book/search?searchText=${searchText}`,true,header);
    
  }
}

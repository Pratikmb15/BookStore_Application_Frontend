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
}

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { BehaviorSubject } from 'rxjs';

interface Book {
  bookId: number;
  description: string;
  discountPrice: number;
  bookImage: string;
  userId: number;
  bookName: string;
  author: string;
  quantity: number;
  price: number
  createdAtDate: Date;
  updatedAtDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  token: any;

  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSubject.asObservable();

  private selectedBookSource = new BehaviorSubject<Book | null>(null);
  selectedBook$ = this.selectedBookSource.asObservable();


  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token')
    if (!this.token) {
      console.error(" No token found! User might not be logged in.");
    } else {
      console.log(" Token found:", this.token);
    }
  }

  setSearchText(text: string) {
    this.searchTextSubject.next(text);
  }
  setSelectedBook(book: Book) {
    this.selectedBookSource.next(book);
  }

  getSelectedBook(): Book | null {
    return this.selectedBookSource.value;
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

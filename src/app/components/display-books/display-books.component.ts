import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/Book/book.service';

interface Book {
  bookId: number;
  description:string;
  discountPrice: number;  
  bookImage:string;
  userId:number;
  bookName:string;
  author:string;
  quantity:number;
  price:number
  createdAtDate:Date;
  updatedAtDate:Date;
}

@Component({
  selector: 'app-display-books',
  standalone: false,
  templateUrl: './display-books.component.html',
  styleUrl: './display-books.component.scss'
})
export class DisplayBooksComponent implements OnInit {
  error:any;
  books: Book[] = [];
  currentPage = 1;
  totalPages = 10;
  constructor(private bookService:BookService){}
  ngOnInit() {
    this.fetchBooks();
   }
   fetchBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: any) => {
        console.log('Books response:', response);
        if (response && response.success && response.data) {
          // Add UI state properties to each note
          this.books = response.data;
        } else {
          this.error = 'Invalid response format';
          console.error('Invalid response format:', response);
        }

      }
    })
  }

}

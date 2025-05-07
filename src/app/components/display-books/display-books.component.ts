import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/Book/book.service';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-display-books',
  standalone: false,
  templateUrl: './display-books.component.html',
  styleUrl: './display-books.component.scss'
})
export class DisplayBooksComponent implements OnInit {
  error: any;
  books: Book[] = [];
  currentPage = 1;
  totalPages = 10;
  searchText = '';
  constructor(private bookService: BookService,private router: Router) { }
  ngOnInit() {
    this.fetchBooksByPage(1);
    this.bookService.searchText$.subscribe(text => {
      this.searchText = text;
      this.searchBooks(this.searchText);
    });
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
  fetchBooksByPage(page: number = 1) {
    this.bookService.getBooksByPage(page).subscribe({
      next: (response: any) => {
        console.log('Paginated Books response:', response);
        if (response && response.success && response.data) {
          this.books = response.data;
          this.currentPage = page;
        } else {
          this.error = 'Invalid response format';
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => {
        this.error = 'Failed to fetch books';
        console.error('Fetch error:', err);
      }
    });
  }
  sortBook(order: boolean = true) {
    this.bookService.sortBooks(order).subscribe({
      next: (res: any) => {
        console.log('Sorted Books are : ', res);
        if (res && res.success && res.data) {
          this.books = res.data;
        } else {
          this.error = 'Invalid response format';
          console.error('Invalid response format:', res);
        }
      },
      error: (err) => {
        this.error = 'Failed to Sort books';
        console.error('Sort error:', err);
      }
    })
  }
  searchBooks(searchText: string = '') {
    this.bookService.searchBook(searchText).subscribe({
      next: (res: any) => {
        console.log('Searched books are : ', res);
        if (res && res.success && res.data) {
          this.books = res.data;
        } else {
          this.error = 'Invalid response format';
          console.error('Invalid response format:', res);
        }
      },
      error: (err) => {
        this.error = 'Failed to Search book';
        console.error('search error : ', err);
      }
    })
  }
  onBookClick(book: Book) {
    this.bookService.setSelectedBook(book);
    this.router.navigate(['/home/book']);
  }
}

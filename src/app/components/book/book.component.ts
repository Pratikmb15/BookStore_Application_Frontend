import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/Book/book.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/Cart/cart.service';

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
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  book!: Book;
  isAddedToBag: boolean = false;
  quantity: number = 1;
  cartId:number=0;

  error: any;

  constructor(private bookService: BookService, private cartService: CartService, private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit() {
    const selected = this.bookService.getSelectedBook();
    if (selected) {
      this.book = selected;
    } else {
      // handle null case, e.g., redirect to display-books
      this.router.navigate(['/home']);

    }
  }
  addToBag() {

    let reqData = {
      bookId: this.book.bookId
    }
    return this.cartService.addBookToCart(reqData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isAddedToBag = true;
        this.quantity = 1;
        this.snackBar.open('Book added to Cart Successfully', '', { duration: 5000 });
      }
      , error: (err) => {
        console.error('Add to cart Failed :', err);
        this.snackBar.open('Could not add book to Cart !', '', { duration: 5000 });
        if (err.error) {
          console.error('Server Response:', err.error);
        }
      }
    })

  }
  getCartId(bookId: number) {
    return this.cartService.getCartIdByBookId(bookId).subscribe({
      next: (response: any) => {
        console.log('Get cart id  response:', response);
        if (response && response.success && response.data) {
          this.cartId = response.data;
        } else {
          this.error = 'Invalid response format';
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => {
        this.error = 'Failed to fetch Cart Id';
        console.error('Fetch error:', err);
      }
    });
  }

  increaseQuantity() {
    let reqData = {
      bookId: Number(this.book.bookId),
      bookQuantity: Number(this.quantity + 1)
    }
     this.cartId = Number(this.getCartId(this.book.bookId))
    return this.cartService.updateCart(this.cartId, reqData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.quantity++;
        this.snackBar.open('Book added to Cart Successfully', '', { duration: 5000 });
      }
      , error: (err) => {
        console.error('Add to cart Failed :', err);
        this.snackBar.open('Could not add book to Cart !', '', { duration: 5000 });
        if (err.error) {
          console.error('Server Response:', err.error);
        }
      }
    })
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      let reqData = {
        bookId: Number(this.book.bookId),
        bookQuantity: Number(this.quantity + 1)
      }
      this.cartId = Number(this.getCartId(this.book.bookId));
      return this.cartService.updateCart(this.cartId, reqData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.quantity--;
          // this.snackBar.open('Book removed from Cart Successfully', '', { duration: 5000 });
        }
        , error: (err) => {
          console.error('Add to cart Failed :', err);
          // this.snackBar.open('Could not remove book from Cart !', '', { duration: 5000 });
          if (err.error) {
            console.error('Server Response:', err.error);
          }
        }
      })
    }
    if (this.quantity == 1) {

      this.cartId = Number(this.getCartId(this.book.bookId));
      return this.cartService.deleteCartItem(this.cartId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.quantity--;
          this.isAddedToBag = false;
          this.snackBar.open('Book removed from Cart Successfully', '', { duration: 5000 });

        },
        error: (err) => {
          console.error('Add to cart Failed :', err);
          this.snackBar.open('Could not remove book from Cart !', '', { duration: 5000 });
          if (err.error) {
            console.error('Server Response:', err.error);
          }
        }
      })
    }
    return;
  }
}

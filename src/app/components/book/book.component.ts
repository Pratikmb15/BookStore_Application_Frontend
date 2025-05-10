import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/Book/book.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/Cart/cart.service';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from '../../services/Whislist/wishlist.service';

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
  quantity: number = 0;
  cartId:number=0;
  isWishlistDisabled: boolean = false;


  error: any;

  constructor(private bookService: BookService, private cartService: CartService, private wishlistService:WishlistService,private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit() {
    const selected = this.bookService.getSelectedBook();
    if (selected) {
      this.book = selected;
    } else {
      
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
        this.cartId =  Number(this.getCartId(this.book.bookId));
        this.updateQuantity(true);
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
  addToWishlist(){
    let reqData={
      bookId:Number(this.book.bookId)
    }
    return this.wishlistService.addItemToWishList(reqData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.snackBar.open('Added book to wishlist', '', { duration: 5000 });
        this.isWishlistDisabled = true;
       
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
  updateQuantity(add:boolean) {
    this.cartService.adjustCartQuantity(add);
  }

  increaseQuantity() {
    let reqData = {
      bookId: this.book.bookId
    }
    return this.cartService.addBookToCart(reqData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isAddedToBag = true;
        this.quantity ++;
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
 async decreaseQuantity() {
   if(this.quantity==1){
   await this.removeItemFromCart();
   this.isAddedToBag = false;
   this.updateQuantity(false);
   }
   else 
   await this.removeItemFromCart();
 
  }
 async removeItemFromCart(){
    return this.cartService.deleteCartItem(this.cartId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.quantity--;       
        this.snackBar.open(res.message, '', { duration: 5000 });

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
  

}

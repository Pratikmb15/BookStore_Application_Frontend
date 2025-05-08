import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/Cart/cart.service';
import { BookService } from '../../services/Book/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


interface Cart{
  cartId: number,
        userId: number,
        bookId: number,
        bookQuantity: number,
        price: number,
        isPurchased: boolean,
        book: Book        
}
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
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  error: any;
  quantity:number=1;
  cartItems:Cart[]=[];
  constructor(private bookService: BookService, private cartService: CartService, private router: Router, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.getallCartItems();
  }

    getallCartItems(){
      return this.cartService.getAllIemsInCart().subscribe({
      next:(res : any) => {
        console.log(res);
       console.log('Cart items fetched successfully');
       this.cartItems=res.data.cartItems;
      },
      error: (err) => {
        this.error = 'Failed to fetch Cart Id';
        console.error('Fetch error:', err);
      }
    })
  }

  increaseQuantity(item: Cart) {
    let reqData = {
      bookId: item.book.bookId
    }
    return this.cartService.addBookToCart(reqData).subscribe({
      next: (res: any) => {
        console.log(res);    
        this.quantity ++;
        this.getallCartItems();
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
 async decreaseQuantity(item:Cart) {
   if(this.quantity==1){
   await this.removeItemFromCart(item);

   }
   else 
   await this.removeItemFromCart(item);
  }
 async removeItemFromCart(item:Cart){
    return this.cartService.deleteCartItem(item.cartId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.quantity--;
        this.getallCartItems();
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

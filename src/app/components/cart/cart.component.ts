import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/Cart/cart.service';
import { BookService } from '../../services/Book/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';


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
  isOrderSummaryOpen:boolean = false;
  isAddOrder:boolean=false;
  isOrderPlaced:boolean=false;
  totalPrice:number=0;
  constructor(private orderService:OrderService, private cartService: CartService, private router: Router, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.getallCartItems();
  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }
  openAddressDetails(){
    this.isAddOrder=true;
    console.log(this.isAddOrder);
  }
  toggleDetails() {
    this.isOrderSummaryOpen = !this.isOrderSummaryOpen;
  }
  recievedOrderSummaryRequest(){
    this.isOrderSummaryOpen=true;
  }
   async getallCartItems(){
      return this.cartService.getAllIemsInCart().subscribe({
      next:(res : any) => {
        console.log(res);
       console.log('Cart items fetched successfully');
       this.cartItems=res.data.cartItems;
       this.totalPrice=res.data.totalPrice;  
       this.updateQuantity(this.cartItems.length);
      },
      error: (err) => {
        this.error = 'Failed to fetch Cart Id';
        console.error('Fetch error:', err);
      }
    })
  }
  updateQuantity(totalQuantity:number) {
    this.cartService.updateCartQuantity(totalQuantity);
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
   this.cartService.adjustCartQuantity(false);
   this.getallCartItems();

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
  placeOrder(){
    let reqData={}
    return this.orderService.addOrder(reqData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.isOrderPlaced=true;
        this.snackBar.open('Order Placed Successfully', '', { duration: 5000 });
      },
      error:(err:any)=>{
        console.error('Failed to Place Order :', err);
        this.snackBar.open('Could not place Order !', '', { duration: 5000 });
        if (err.error) {
          console.error('Server Response:', err.error);
        }
      }
    })
  }
}

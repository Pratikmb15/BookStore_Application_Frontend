import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/Order/order.service';
import { CartService } from '../../services/Cart/cart.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
interface order{
  orderId: number,
      userId: number,
      bookId: number,
      quantity: number,
      totalPrice: number,
      orderDate: Date,
      book:Book
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
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
orders:order[]=[];
error:any;

constructor(private orderService:OrderService, private cartService: CartService, private router: Router, private snackBar: MatSnackBar){}
  ngOnInit() {
   this.fetchAllOrders();
  }

fetchAllOrders(){
  return this.orderService.getOrders().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.orders=res.data;
    },
    error: (err) => {
      this.error = 'Failed to fetch Orders';
      console.error('Fetch error:', err);
    }
  })
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/Book/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/Cart/cart.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  cartQuantity: number = 0;
  constructor(private router: Router, private bookService: BookService, private cartService: CartService, private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.cartService.cartQuantity$.subscribe(quantity => {
      this.cartQuantity = quantity;
    });
  }
  

  onSearchChange(event: any) {
    this.bookService.setSearchText(event.target.value);
  }
  navigateToAuth() {
    this.router.navigate(['']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToCart() {
    this.router.navigate(['/home/cart']);
  }
  navigateToMyOrders() {
    this.router.navigate(['/home/orders']);
  }
  navigateToMyWishlist(){
    this.router.navigate(['/home/wishlist']);
  }
  logOut() {
    try {
      localStorage.removeItem("token");
      console.log('user logged out successfully ');
      this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
      this.router.navigate(['']);

    } catch (Error: any) {
      console.log('Log out failed ');

    }
  }
}

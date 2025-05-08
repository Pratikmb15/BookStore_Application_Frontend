import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/Book/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
constructor(private router: Router,private bookService: BookService,private snackBar: MatSnackBar){}
onSearchChange(event: any) {
  this.bookService.setSearchText(event.target.value);
}
navigateToAuth(){
  this.router.navigate(['']);
}
navigateToHome(){
  this.router.navigate(['/home']);
}
navigateToCart(){
  this.router.navigate(['/home/cart']);
}
logOut(){
  try{
  localStorage.removeItem("token");
  console.log('user logged out successfully ');
  this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
  this.router.navigate(['']);

}catch(Error:any){
  console.log('Log out failed ');
  
}
}
}

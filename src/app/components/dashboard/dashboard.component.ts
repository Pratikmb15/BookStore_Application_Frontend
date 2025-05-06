import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/Book/book.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
constructor(private router: Router,private bookService: BookService){}
onSearchChange(event: any) {
  this.bookService.setSearchText(event.target.value);
}
navigateToAuth(){
  this.router.navigate(['']);
}
}

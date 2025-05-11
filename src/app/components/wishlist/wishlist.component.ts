import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/Cart/cart.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../services/Whislist/wishlist.service';
import { error } from 'console';

interface wishList{
  'whishListId': number,
      'userId': number,
      'bookId': number,
      'book':Book
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
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
wishListItems:wishList[]=[];
  error: any;
  constructor(private wishlistService:WishlistService, private cartService: CartService, private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.fetchAllWishlistItems();
  }
  fetchAllWishlistItems(){
    return this.wishlistService.getWishListItems().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.wishListItems=res.data;
      },
      error: (err) => {
        this.error = 'Failed to fetch books';
        console.error('Fetch error:', err);
      }
    })
  }
  deleteWishlistItem(wishListItemId:number){
    return this.wishlistService.removeWishlistItem(wishListItemId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.snackBar.open('Item removed from wishlist successfully','',{duration:5000});
        this.fetchAllWishlistItems();
      }
      , error: (err) => {
        console.error('Failed to remove item from wishlist :', err);
        this.snackBar.open('Failed to remove item from wishlist !', '', { duration: 5000 });
        if (err.error) {
          console.error('Server Response:', err.error);
        }
      }

    })
  }
 

}

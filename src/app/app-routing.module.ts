import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplayBooksComponent } from './components/display-books/display-books.component';
import { BookComponent } from './components/book/book.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AuthguardService } from './services/AuthGuard/authguard.service';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'home', component: DashboardComponent,
    children: [
      { path: '', component: DisplayBooksComponent },
      {path:'book',component:BookComponent},
      {path:'cart',component:CartComponent},
      {path:'orders',component:OrderComponent},
      {path:'wishlist',component:WishlistComponent}

    ],canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

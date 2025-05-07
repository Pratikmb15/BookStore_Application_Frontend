import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplayBooksComponent } from './components/display-books/display-books.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'home', component: DashboardComponent,
    children: [
      { path: '', component: DisplayBooksComponent },
      {path:'book',component:BookComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const isAuthenticated = localStorage.getItem('token') !== null; 
    
    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to login page if not authenticated
      this.router.navigate(['']);
      return false;
    }
  }
}

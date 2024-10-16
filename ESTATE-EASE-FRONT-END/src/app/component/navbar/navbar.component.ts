
  import { Component, HostListener, OnInit } from '@angular/core';
  import { AuthService } from '../../service/auth.service';
  import { Subscription } from 'rxjs';
  import { Router } from '@angular/router';
  
  @Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
  export class NavbarComponent implements OnInit {
  
    isLoggedIn: boolean = false;
    username: string | null = '';
    private subscriptions: Subscription = new Subscription();
    propertyDropdownOpen = false;
    navOpen = false;

    toggleNavbar() {
      this.navOpen = !this.navOpen;
    }
  
    constructor(private authService: AuthService, private router: Router) {}
  
    ngOnInit(): void {
      // Retrieve the logged-in user from sessionStorage
      if (typeof sessionStorage !== 'undefined') {
        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          this.username = user.username; // Access username from the full user object
          this.isLoggedIn = true; // Assume user is logged in if data is in session storage
        }
      }
  
      // Subscribe to AuthService observables for real-time updates
      this.subscriptions.add(
        this.authService.isAuthenticated().subscribe(loggedIn => {
          this.isLoggedIn = loggedIn;
        })
      );
  
      this.subscriptions.add(
        this.authService.getUserName().subscribe(username => {
          this.username = username;
        })
      );
    }
  
    togglePropertyDropdown() {
      this.propertyDropdownOpen = !this.propertyDropdownOpen;
    }
  
    logout() {
      this.authService.logout();
      this.isLoggedIn = false;
      this.username = null; // Clear the username
      sessionStorage.clear();  // Clear session storage on logout
    }
  
    logoClick() {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['home-page']);
      });
    }
  
    ngOnDestroy(): void {
      // Clean up subscriptions to avoid memory leaks
      this.subscriptions.unsubscribe();
    }
  }
  
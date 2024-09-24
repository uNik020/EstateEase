import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import tap here

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { 
    if (typeof window !== 'undefined') {
      const userString = localStorage.getItem('user');
      
      if (userString) {
        this.loggedIn.next(true);
        this.username.next(JSON.parse(userString).username);
      }
    }
  }

  private isLoggedIn = false;

  // Method to check if the user is logged in
  isUserLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    return this.isLoggedIn;
  }

  // You may also have a method to set the login status
  setLoginStatus(status: boolean) {
    this.isLoggedIn = status;
  }
  
  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserName(): Observable<string> {
    return this.username.asObservable();
  }


  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user)
      .pipe(
        tap(response => {
          if (response) {
            this.loggedIn.next(true);
            this.username.next(response.username);  // Use the username from the full user object
  
            // Store the full user object in sessionStorage 
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('loggedInUser', JSON.stringify(response));  // Storing full user object
            }
          }
        })
      );
  }  

  // Method to log out the user
  logout(): void {
    this.loggedIn.next(false);
    this.username.next('');
    localStorage.removeItem('user');
    window.location.href = '/home-page';
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseurl } from '../baseURL';
import { Property } from '../entities/property';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) {}

  // Add property to wishlist
  addToWishlist(property: Property, userId: number): Observable<any> {
    const wishlistItem = {
      pId: property.propertyId, // or whichever field identifies the property
      uId: userId
    };
    return this.http.post<any>(`${baseurl}/api/wishlist/${property.propertyId}/${userId}`, wishlistItem);
  }
  

  // Get all properties in wishlist for a specific user
  getUserWishlist(userId: number): Observable<any> {
    // Updated to match the new backend endpoint
    return this.http.get<any[]>(`${baseurl}/api/wishlist/${userId}`);
  }

  // Fetch wishlist items for a specific user
  getWishlistByUserId(userId: number): Observable<any> {
    // This method is similar to getUserWishlist; make sure to use consistent naming
    return this.getUserWishlist(userId);
  }

  // Optional: Add a method for deleting wishlist by ID or owner ID if needed
  deleteWishlistById(wId: number): Observable<any> {
    return this.http.delete<any>(`${baseurl}/api/wishlist/deleteById/${wId}`);
  }

  deleteWishlistByOwnerId(ownerId: number): Observable<any> {
    return this.http.delete<any>(`${baseurl}/api/wishlist/deleteByOwnerId/${ownerId}`);
  }

  deleteFromWishlist(propertyId: number, userId: number): Observable<any> {
    const url = `${baseurl}/api/wishlist/delete?propertyId=${propertyId}&userId=${userId}`; // Backend API endpoint
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete(url, httpOptions);
  }
}

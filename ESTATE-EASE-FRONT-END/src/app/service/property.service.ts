import { Injectable } from '@angular/core';
import { Property } from '../entities/property';
import { HttpClient, HttpParams } from '@angular/common/http';
import { baseurl } from '../baseURL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private http: HttpClient){}

  public addProperty(property: Property) {
    // Assuming the user ID is stored in sessionStorage as 'loggedInUser'
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser.userId; // Ensure the userId exists in the session storage

    console.log(property);

    // Append userId as a query parameter in the URL
    return this.http.post(`${baseurl}/api/properties/create?userId=${userId}`, property);
  }

  public getAllProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(`${baseurl}/api/properties/all`);
  }
 // Fetch properties that are not owned by the logged-in user
 getAvailableProperties(userId: number): Observable<Property[]> {
  return this.http.get<Property[]>(`${baseurl}/api/properties/available?userId=${userId}`);
}
  
  public getPropertyById(propertyId: number): Observable<Property> {
    return this.http.get<Property>(`${baseurl}/api/properties/${propertyId}`);
  }
  

  public getPropertiesByCity(city:String){
    return this.http.get(`${baseurl}/api/properties/city/{city}`);
  }
  public getPropertiesByState(state:String){
    return this.http.get(`${baseurl}/api/properties/state/{state}`);
  }
   public getPropertiesByCountry(country:String){
    return this.http.get(`${baseurl}/api/properties/country/{country}`);
  }

  public getPropertiesByUserId(userId:number): Observable<Property[]>{
    return this.http.get<Property[]>(`${baseurl}/api/properties/user/${userId}`);
  }
  public updatePropertyById(property:Property,propertyId:number){
    return this.http.put(`${baseurl}/api/properties/update/{id}`,property);
  }

  public deletePropertyById(propertyId:number){
    return this.http.delete(`${baseurl}/api/properties/delete/${propertyId}`);
  }


  addToWishlist(property: Property) {
    return this.http.post(`${baseurl}/${property.propertyId}/wishlist`, {});
  }

  addToFavorites(property: Property) {
    return this.http.post(`${baseurl}/${property.propertyId}/favorite`, {});
  }

   // Method to update the property status
  //  updatePropertyStatus(propertyId: number, propertyStatus: string): Observable<any> {
  //   const payload = { propertyStatus: propertyStatus };
  //   return this.http.put(`${baseurl}/api/properties/update/{propertyId}`, payload);
  // }

}

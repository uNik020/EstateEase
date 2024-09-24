import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from '../baseURL';
import { User } from '../entities/user';
import { Contact } from '../entities/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

   //find user by email
   public findUserByEmail(email : String){
    return this.httpClient.get(`${baseurl}/api/user/getByEmail/${email}`);
  }

  //find user by id
  public findUserById(userId : number){
    return this.httpClient.get(`${baseurl}/api/user/${userId}`);
  }

  //update user
  public updateUser(userId:number,user : User){
    return this.httpClient.put(`${baseurl}/api/user/${userId}`,user);
  }

  
  //contact us
  public saveContactUs(contact : Contact){
    return this.httpClient.post(`${baseurl}/api/contact/`,contact);
  }

  public getAllContactUs(){
    return this.httpClient.get(`${baseurl}/api/contact/`);
  }

  public findContactUsById(contact_id : number){
    return this.httpClient.get(`${baseurl}/api/contact/${contact_id}`);
  }
}

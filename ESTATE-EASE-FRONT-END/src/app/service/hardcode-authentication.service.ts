import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodeAuthenticationService {

  constructor(private http:HttpClient) { }

  //login

 public isUserLoggedIn(){
  let user=sessionStorage.getItem('accountId')
  return !(user==null)
}
// public isAdminLoggedIn(){
//   let user=sessionStorage.getItem('accountId')
//   return !(user==null)
// }




//logout
logout(){
  sessionStorage.removeItem('accountId');
}
  // admin login api
  authenticate(mail:string,pass:string){
    console.log(pass)
    console.log(mail)
  return this.http.get(`http://localhost:8290/findlogin/${mail}/${pass}`);
  }

  adminauthenticate(username:string,password:string)
  {
    if((username.trim()==="spmg@23") && (password.trim()==="pk@1247")){
      if (typeof window !== 'undefined') {
      sessionStorage.setItem('authenticateUser',username);
      }
      return true;
    }
    else
    {
      return false;
    }
  }
  
  
public isAdminLoggedIn(){
  let user=sessionStorage.getItem('authenticateAdmin')
  return !(user==null)
}

logoutAdmin(){
  sessionStorage.removeItem('authenticateAdmin');
}

}

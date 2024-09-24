import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from '../baseURL';
import { Email } from '../entities/email';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private httpClient : HttpClient) { }

  public sendOTP(email : Email){
    return this.httpClient.post(`${baseurl}/api/email/`,email);
  }
}

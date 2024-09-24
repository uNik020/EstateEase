import { Injectable } from '@angular/core';
import { baseurl } from '../baseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../entities/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  
  constructor(private http: HttpClient) { }

  getUserTransactions(userId:number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${baseurl}/api/transactions/user/${userId}`);
  }

  createRazorpayOrder(amount: number, propertyId: number): Observable<any> {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    const buyerId=loggedInUser.userId; // Assuming you store the buyer's ID in sessionStorage
    const headers = new HttpHeaders({
      'Buyer-Id': buyerId ? buyerId : ''
    });
    return this.http.get(`${baseurl}/api/transactions/createRazorpayOrder/${amount}/${propertyId}`,{headers});
  }
  

 // Method to save transaction details after successful payment
 saveTransaction(transactionData: Transaction): Observable<any> {
  return this.http.post(`${baseurl}/api/transactions/save`, transactionData);
}

  // verifyPayment(paymentDetails: any): Observable<any> {
  //   return this.http.post(`${baseurl}/api/transactions/verifyPayment`, paymentDetails);
  // }
}
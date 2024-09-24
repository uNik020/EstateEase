import { Time } from "@angular/common";
import { Property } from "./property";
import { User } from "./user";
export class Transaction {
    transactionId: number;
    owner: User;
    buyer: User;
    propertyId:number;
    date: string;
    time: string;
    amount: number;
    razorpayOrderId : string;
		razorpayPaymentId :string;
		razorpaySignature :string;
		paymentStatus :string;
  
    constructor(transactionId: number, owner: User, buyer: User,propertyId:number, date: string, time: string, amount: number,razorpayOrderId : string, razorpayPaymentId :string, razorpaySignature :string, paymentStatus :string) {
      this.transactionId = transactionId;
		this.owner = owner;
		this.buyer = buyer;
		this.propertyId = propertyId;
		this.amount = amount;
		this.date = date;
		this.time = time;
		this.razorpayOrderId = razorpayOrderId;
		this.razorpayPaymentId = razorpayPaymentId;
		this.razorpaySignature = razorpaySignature;
		this.paymentStatus = paymentStatus;
    }
  }
  
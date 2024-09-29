import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../entities/property';
import { PropertyService } from '../../service/property.service';
import Swal from 'sweetalert2';
import { WishlistService } from '../../service/wishlist.service';
import { TransactionsService } from '../../service/transactions.service';
import { Transaction } from '../../entities/transaction';
import { Time } from '@angular/common';
import { windowTime } from 'rxjs';
import { now } from 'jquery';

declare var Razorpay: any;
 //Razorpay mastercard- 5267 3181 8797 5449
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  property: Property | any;
  wishlist: any[] = [];
  isInWishlist: boolean = false;
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  userId = this.loggedInUser.userId; // Ensure the userId exists in the session storage
  isLoggedIn:boolean=false;

  constructor(
    private route: ActivatedRoute, 
    private router:Router,
    private changeDetectorRef: ChangeDetectorRef,
    private wishlistService: WishlistService,
    private propertyService: PropertyService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.checkUserLoginStatus();
    this.getPropertyDetails();
    this.loadWishlist();
  }
  
  // Method to check if the user is logged in
  checkUserLoginStatus(): void {
    const storedUser = sessionStorage.getItem('loggedInUser');
    
    // Check if loggedInUser exists in session storage and is valid
    if (storedUser && storedUser !== '{}') {
      this.loggedInUser = JSON.parse(storedUser);
      
      // Check if the userId exists in the stored user object
      if (this.loggedInUser && this.loggedInUser.userId) {
        this.userId = this.loggedInUser.userId;
        this.isLoggedIn = true; // Set the isLoggedIn flag to true
      }
    } else {
      this.isLoggedIn = false; // User is not logged in
    }
  }
  
  getPropertyDetails(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.propertyService.getPropertyById(+propertyId).subscribe(
        (data: Property) => {
          this.property = data;
          console.log('Property fetched:', this.property);
          console.log('Owner:', this.property.user);
        },
        (error) => {
          console.error('Error fetching property details', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error fetching property details',
          });
        }
      );
    }
  }

  // Remove 'verifyPayment' as it's no longer needed
  buyProperty(propertyId: number, amount: number) {
    // Check if the user is logged in
    if (!this.isLoggedIn) {
      // Show SweetAlert prompting the user to log in or register
      Swal.fire({
        title: 'You are not logged in!',
        text: 'Please sign in or register to buy a property.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sign In',
        cancelButtonText: 'Register'
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to sign-in page
          this.router.navigate(['/login']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Navigate to register page
          this.router.navigate(['/register']);
        }
      });
    } else {
      // Proceed with the order creation if the user is logged in
      this.transactionService.createRazorpayOrder(amount, propertyId).subscribe({
        next: (response: any) => {
          this.launchRazorpay(response, propertyId, amount); // Pass propertyId and amount
          console.log("Order created successfully:", response);
        },
        error: (error) => {
          console.error("Error while creating order:", error); 
          Swal.fire('Error', 'Something went wrong with the order creation!', 'error');
        }
      });
    }
  }

  launchRazorpay(orderData: any, propertyId: number, amount: number) {
    const options = {
      "key": "rzp_test_DWE7Q9vgAOh4if", // Razorpay key ID from your config
      "amount": orderData.amount, // Amount in paise
      "currency": orderData.currency,
      "name": "Estate-Ease",
      "description": "Test Transaction",
      "image": "../../../assets/Estate Ease Logo2.jpeg", // Optional
      "order_id": orderData.id, // Razorpay order ID
      "handler": (response: any) => {
        // Directly save the transaction and update property after payment success
        console.log("RESPONSE IN ...",response);
        this.saveTransactionAndUpdateProperty(response, propertyId, amount);
      },
      "prefill": {
        "name": this.loggedInUser.username, // Prefill with logged-in user info
        "email": this.loggedInUser.email,
        "contact": this.loggedInUser.contact
      },
      "theme": {
        "color": "#007bff"
      }
    };
    
    const razorpay = new Razorpay(options);
    razorpay.open();
  }
  setPaymentStatus(paymentResponse: any): string {
    // Check the payment response for success or failure
    if (paymentResponse.razorpay_payment_id) {
      return "SUCCESS"; // Payment successful
    } else {
      return "FAILURE"; // Payment failed
    }
  }
  saveTransactionAndUpdateProperty(paymentResponse: any, propertyId: number, amount: number) {
   
    // Construct the transaction data
    const now = new Date();
    const transactionData = {
      transactionId: 0,  // Initialize with default values
      owner: this.property.user,
      buyer: this.loggedInUser.userId,  // Assuming userId is stored in session
      propertyId: this.property.propertyId,
      date: now.toISOString().split('T')[0], // Get 'YYYY-MM-DD'
      time: now.toISOString().split('T')[1].split('.')[0], // 'HH:mm:ss'
      razorpayOrderId: paymentResponse.razorpay_order_id,  
        razorpayPaymentId: paymentResponse.razorpay_payment_id, 
        razorpaySignature: paymentResponse.razorpay_signature, 
        paymentStatus: this.setPaymentStatus(paymentResponse), // Set status based on response
        amount: amount
      };
    
    console.log("owner ....",this.property.user);
    console.log("PAYMENT RESPONSE",paymentResponse);
    console.log("THIS IS THE DATA OF TRANSACTION:",transactionData);

    // Call the backend API to save the transaction and update the property status
    this.transactionService.saveTransaction(transactionData).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Payment successful! Property is now sold.', 'success');
        console.log("This is success response:",response);
        // You can navigate to a success page or dashboard
        //this.updatePropertyStatus(propertyId); // Optionally update the UI or navigate away
      },
      error: (error) => {
        Swal.fire('Error', 'Transaction failed!', 'error');
      }
    });
  }
        
          checkIfInWishlist(propertyId: number): void {
            this.isInWishlist = this.isPropertyInWishlist(propertyId);
          }
          
          loadWishlist() {
            this.wishlistService.getWishlistByUserId(this.userId).subscribe(
              (response) => {
                console.log('Wishlist response:', response);
                this.wishlist = response; // Assuming the response is the list of properties in the wishlist
                // Check if the property is already in the wishlist after loading
                this.checkIfInWishlist(this.property.propertyId);
                this.changeDetectorRef.detectChanges();
              },
              (error) => {
                console.error('Error loading wishlist', error);
              }
            );
          }

  isPropertyInWishlist(propertyId: number): boolean {
    console.log('Checking wishlist for propertyId:', propertyId);
    console.log('Current wishlist:', this.wishlist);
  
    const found = this.wishlist.some(item => item.propertyId === propertyId);
    return found;
  }

  addToWishlist(property: Property) {
    if (this.isPropertyInWishlist(property.propertyId)) {
      Swal.fire({
        icon: 'info',
        title: 'Already Added',
        text: 'This property is already in your wishlist.',
      });
      return;
    }
    this.wishlistService.addToWishlist(property, this.userId).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Property added to wishlist!',
        });
        this.wishlist.push(property);
        this.isInWishlist = true; // Update the state after adding
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error adding to wishlist', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add property to wishlist.',
        });
      }
    );
  }
}

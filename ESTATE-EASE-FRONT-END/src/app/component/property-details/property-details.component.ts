import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  property: Property | any;
  wishlist: any[] = [];
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  userId = this.loggedInUser.userId; // Ensure the userId exists in the session storage

  constructor(
    private route: ActivatedRoute, 
    private changeDetectorRef: ChangeDetectorRef,
    private wishlistService: WishlistService,
    private propertyService: PropertyService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.getPropertyDetails();
    buyer: this.loggedInUser.userId;
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

  // updatePropertyStatus(propertyId: number) {
  //   // Optionally call this to update the property in the frontend
  //   this.propertyService.updatePropertyStatus(propertyId, 'SOLD').subscribe({
  //     next: (response) => {
  //       // Handle success
  //       Swal.fire('Success', 'Property status updated to sold!', 'success');
  //     },
  //     error: (error) => {
  //       // Handle error
  //       Swal.fire('Error', 'Failed to update property status!', 'error');
  //     }
  //   });
  // }

  isPropertyInWishlist(propertyId: number): boolean {
    return this.wishlist.some(item => item.propertyId === propertyId);
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

// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Property } from '../../entities/property';
// import { PropertyService } from '../../service/property.service';
// import Swal from 'sweetalert2';
// import { WishlistService } from '../../service/wishlist.service';
// import { TransactionsService } from '../../service/transactions.service';
// import { Transaction } from '../../entities/transaction';

// declare var Razorpay: any;

// @Component({
//   selector: 'app-property-details',
//   templateUrl: './property-details.component.html',
//   styleUrls: ['./property-details.component.css']
// })
// export class PropertyDetailsComponent implements OnInit {
//   property: Property | any;
//   wishlist: any[] = [];
//   loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
//   userId = this.loggedInUser.userId; // Ensure the userId exists in the session storage

//   constructor(
//     private route: ActivatedRoute, 
//     private changeDetectorRef: ChangeDetectorRef,
//     private wishlistService: WishlistService,
//     private propertyService: PropertyService,
//     private transactionService: TransactionsService
//   ) {}

//   ngOnInit(): void {
//     this.getPropertyDetails();
//     console.log(this.loggedInUser);
//   }

//   getPropertyDetails(): void {
//     const propertyId = this.route.snapshot.paramMap.get('id');
//     if (propertyId) {
//       this.propertyService.getPropertyById(+propertyId).subscribe(
//         (data: Property) => {
//           this.property = data;
//         },
//         (error) => {
//           console.error('Error fetching property details', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Error fetching property details',
//           });
//         }
//       );
//     }
//   }

//   buyProperty(propertyId: number, amount: number) {
//     this.transactionService.createRazorpayOrder(amount).subscribe({
//       next: (response: any) => {
//         this.launchRazorpay(response);
//         console.log("Order created successfully:", response);
//       },
//       error: (error) => {
//         console.error("Error while creating order:", error); 
//         Swal.fire('Error', 'Something went wrong with the order creation!', 'error');
//       }
//     });
//   }

//   launchRazorpay(orderData: any) {
//     const options = {
//       "key": "rzp_test_DWE7Q9vgAOh4if", // Razorpay key ID from your config
//       "amount": orderData.amount, // Amount in paise
//       "currency": orderData.currency,
//       "name": "Estate-Ease",
//       "description": "Test Transaction",
//       "image": "../../../assets/Estate Ease Logo2.jpeg", // Optional
//       "order_id": orderData.id, // Razorpay order ID
//       "handler": (response: any) => {
//         // Capture payment success response
//         this.verifyPayment(response, orderData.id); // Pass the order ID to verifyPayment
        
//       },
//       "prefill": {
//         "name": this.loggedInUser.username, // Prefill with logged-in user info
//         "email": this.loggedInUser.email,
//         "contact": this.loggedInUser.contact
//       },
//       "theme": {
//         "color": "#007bff"
//       }
//     };

//     const razorpay = new Razorpay(options);
//     razorpay.open();
//   }

//   verifyPayment(paymentResponse: any, orderId: string) {
//     const paymentData = {
//       razorpay_order_id: paymentResponse.razorpay_order_id,
//       razorpay_payment_id: paymentResponse.razorpay_payment_id,
//       razorpay_signature: paymentResponse.razorpay_signature,
//       propertyId: this.property.propertyId, // Assuming propertyId is available in this.property
//       amount: this.property.price // Replace with actual property price if different
//     };

//     // Use Angular's HttpClient for the API call
//     this.transactionService.verifyPayment(paymentData).subscribe({
//       next: (verifyResponse) => {
//         Swal.fire('Success', 'Payment successful!', 'success');
//         // You can navigate to a success page or dashboard
//       },
//       error: (error) => {
//         Swal.fire('Error', 'Payment verification failed!', 'error');
//       }
//     });
// }

// updateProperty(propertyId: number) {
//     // Implement the update logic
//   }

//   isPropertyInWishlist(propertyId: number): boolean {
//     return this.wishlist.some(item => item.propertyId === propertyId);
//   }

//   addToWishlist(property: Property) {
//     if (this.isPropertyInWishlist(property.propertyId)) {
//       Swal.fire({
//         icon: 'info',
//         title: 'Already Added',
//         text: 'This property is already in your wishlist.',
//       });
//       return;
//     }
//     this.wishlistService.addToWishlist(property, this.userId).subscribe(
//       (response) => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Added!',
//           text: 'Property added to wishlist!',
//         });
//         this.wishlist.push(property);
//         this.changeDetectorRef.detectChanges();
//       },
//       (error) => {
//         console.error('Error adding to wishlist', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to add property to wishlist.',
//         });
//       }
//     );
//   }
// }

    
      // verifyPayment(paymentResponse: any, orderId: string) {
      //   const paymentData = {
      //     razorpay_order_id: paymentResponse.razorpay_order_id,
      //     razorpay_payment_id: paymentResponse.razorpay_payment_id,
      //     razorpay_signature: paymentResponse.razorpay_signature,
      //     purchasedPropertyId: this.property.propertyId, // Assuming propertyId is available in this.property
      //     amount: this.property.price // Replace with actual property price if different
      //   };
    
      //   fetch('/api/transactions/verifyPayment', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(paymentData)
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // Handle success or error
      //   this.transactionService.verifyPayment(paymentData).subscribe({
      //     next: (verifyResponse) => {
      //       Swal.fire('Success', 'Payment successful!', 'success');
      //       // You can navigate to a success page or dashboard
      //     },
      //     error: (error) => {
      //       Swal.fire('Error', 'Payment verification failed!', 'error');
      //     }
      //   });
      // });
      
      // }
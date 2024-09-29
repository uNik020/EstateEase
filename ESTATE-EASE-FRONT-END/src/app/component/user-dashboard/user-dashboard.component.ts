import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from '../../entities/property';
import { PropertyService } from '../../service/property.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { WishlistService } from '../../service/wishlist.service';
import { TransactionsService } from '../../service/transactions.service';
import { Transaction } from '../../entities/transaction';
import { UserService } from '../../service/user.service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;  //status of login
  username: string | any = '';
  email: string = '';
  phone: string = '';
  myListings: Property[] = [];  //loggedin user's listings
  favoriteProperties: Property[] = [];  // favorite properties of the logged-in user
  wishlist: any[] = [];
  loggedInUser: number | any ; //user obj
  activeSection: string = 'Overview'; // Ensure this matches your section selector
  totalPropertiesCount: number = 0;
  activeListingsCount: number = 0;
  transactions: Transaction[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private propertyService: PropertyService,
    private wishlistService: WishlistService,
    private transactionService:TransactionsService,
    private userService:UserService,
    private router: Router
  ) {}

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
  showSection(section: string): void {
    this.activeSection = section; // Change the active section
    if (section === 'Favorites') {
      this.loadFavoriteProperties(); // Refresh favorites when section is activated
    }
    if (section === 'Wishlist') {
      this.loadWishlist(); // Refresh wishlist when section is activated
    }
    if (section === 'Transactions') {
      this.fetchUserTransactions(); //refresh transactions
    }
  }

  ngOnInit(): void {
    // this.loadMyListings();
    // this.calculateCounts();

    if (typeof sessionStorage !== 'undefined') {
      this.username = sessionStorage.getItem('username');
    }
    console.log(sessionStorage.getItem('loggedInUser'));

    // Subscribe to AuthService observables
    this.subscriptions.add(
      this.authService.isAuthenticated().subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
      })
    );

    this.subscriptions.add(
      this.authService.getUserName().subscribe(name => {
        this.username = name;
      })
    );

    // Get logged-in user and load properties
    this.getLoggedInUser();
    this.loadMyListings();
      // Call loadFavoriteProperties after ensuring logged-in user ID is set
    this.loadFavoriteProperties();
    this.loadWishlist();
    this.fetchUserTransactions(); // Call the method to fetch transactions on component load
  }

     // Load wishlist properties for the logged-in user
  loadWishlist() {
    this.wishlistService.getWishlistByUserId(this.loggedInUser).subscribe(
      (response) => {
        console.log('Wishlist response:', response);
        this.wishlist = response; // Assuming the response is the list of properties in the wishlist
      },
      (error) => {
        console.error('Error loading wishlist', error);
      }
    );
  }

  // Fetch the logged-in user ID from session storage and load properties
  getLoggedInUser(): void {
    const userString = sessionStorage.getItem('loggedInUser');
    if (userString) {
      const user = JSON.parse(userString); // Parse the user object
      this.loggedInUser = user.userId; // Assuming 'id' is the key for user ID
      this.username=user.username;
      this.email=user.email;
      this.phone=user.phone;
      
      console.log('Logged In User ID:', this.loggedInUser);
      this.loadMyListings(); // Load properties for this user
    } else {
      console.error('No logged-in user found in session storage');
    }
  }

 // Load properties posted by the logged-in user
loadMyListings(): void {
  if (this.loggedInUser) {
    this.propertyService.getPropertiesByUserId(this.loggedInUser).subscribe(
      properties => {
        this.myListings = properties;
        console.log('My Listings:', this.myListings); // Log the listings

        // Call loadFavoriteProperties after listings are loaded
        this.loadFavoriteProperties();
      },
      error => {
        console.error('Error loading My Listings:', error);
      }
    );
  } else {
    console.error('User ID not found');
  }
}

  //load favorites
  loadFavoriteProperties(): void {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
  
    if (favoriteIds.length === 0) {
      console.warn('No favorite properties found in localStorage.');
      return;
    }
  
    // Fetch all properties
    this.propertyService.getAllProperties().subscribe(
      allProperties => {
        // Filter the favorite properties based on IDs stored in localStorage
        this.favoriteProperties = allProperties.filter(property =>
          favoriteIds.includes(property.propertyId)
        );
  
        // Debugging: Log the filtered favorite properties
        console.log('Favorite Properties:', this.favoriteProperties);
  
        if (this.favoriteProperties.length === 0) {
          console.warn('No favorite properties matched.');
        }
      },
      error => {
        console.error('Error fetching all properties:', error);
      }
    );
  }
  
  
  filterFavoriteProperties(): void {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.favoriteProperties = this.myListings.filter(property => favoriteIds.includes(property.propertyId));
  }
  
    // Function to delete a property by its ID
    deleteProperty(propertyId: number,event: MouseEvent): void {
      // Show a confirmation dialog before deletion
      event.stopPropagation();
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this property?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.propertyService.deletePropertyById(propertyId).subscribe({
            next: (response) => {
              // Remove the deleted property from the list
              this.myListings = this.myListings.filter(property => property.propertyId !== propertyId);
              
              // Show success message using SweetAlert2
              Swal.fire(
                'Deleted!',
                'Your property has been deleted.',
                'success'
              );
            },
            error: (error: HttpErrorResponse) => {
              // Show error message using SweetAlert2
              Swal.fire(
                'Error!',
                'An error occurred while deleting the property.',
                'error'
              );
            }
          });
        }
      });
      //this.calculateCounts();
    }
    
    // Function to remove a property from the wishlist by its ID
removeFromWishlist(propertyId: number, event: MouseEvent): void {
  // Show a confirmation dialog before removal
  event.stopPropagation();
  // Confirm if the user is logged in before proceeding
  const userId = this.loggedInUser;
  if (!userId) {
    Swal.fire(
      'Error!',
      'User is not logged in.',
      'error'
    );
    return;
  }
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to remove this property from your wishlist?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, remove it!',
    cancelButtonText: 'No, cancel!',
  }).then((result) => {
    if (result.isConfirmed) {
      const userId = this.loggedInUser;
      this.wishlistService.deleteFromWishlist(propertyId,userId).subscribe({
        next: (response) => {
          // Remove the deleted property from the wishlist
          this.wishlist = this.wishlist.filter(property => property.propertyId !== propertyId);
          
          // Show success message using SweetAlert2
          Swal.fire(
            'Removed!',
            'The property has been removed from your wishlist.',
            'success'
          );
          this.loadWishlist();
        },
        error: (error: HttpErrorResponse) => {
          // Show error message using SweetAlert2
          console.log(error);
          Swal.fire(
            'Error!',
            'An error occurred while removing the property from your wishlist.',
            'error'
          );
        }
      });
    }
  });
}

     // Calculate the total properties and active listings counts
  // calculateCounts(): void {
  //   this.totalPropertiesCount = this.propertyService.getTotalPostedPropertiesCount();
  //   this.activeListingsCount = this.propertyService.getActiveListingsCount(this.myListings);
  // }

  // Method to navigate to property details
  navigateToDetails(propertyId: number): void {
    console.log(`Clicked propertyId: ${propertyId}`); // For testing
    this.router.navigate(['/property-details', propertyId]);
  }
// Check if the property is already favorited
isFavorited(propertyId: number): boolean {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.includes(propertyId);
}

// Toggle favorite status for the property
toggleFavorite(propertyId: number,event: MouseEvent): void {
  event.stopPropagation();
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.includes(propertyId)) {
    // Remove from favorites
    favorites = favorites.filter((id: number) => id !== propertyId);
  } else {
    // Add to favorites
    favorites.push(propertyId);
  }

  // Save updated favorites in localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
    // Refresh the favorite properties list
    this.loadFavoriteProperties();
}


// Load favorites from localStorage
loadFavorites(): void {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  // Optionally, you can map favorites to your property data here
}

// Method to fetch user transactions from the service
fetchUserTransactions(): void {
  const userString = sessionStorage.getItem('loggedInUser');
  if (userString) {
    const user = JSON.parse(userString); // Parse the user object
    const userId = user.userId; // Assuming 'userId' is the key for the user ID

    // Call the service with the userId
    this.transactionService.getUserTransactions(userId).subscribe(
      (data: Transaction[]) => {
        this.transactions = data; // Assign fetched transactions to the array
        console.log('Fetched transactions:', this.transactions);
      },
      (error) => {
        console.error('Error fetching transactions', error);
      }
    );
  } else {
    console.error('No logged-in user found in session storage');
  }
}

clearTransactions(): void {
  this.transactions = []; // Clears the transaction display
}

//user profile
isEditable: boolean = false; // This tracks whether the fields are editable or not
editProfile(){
  this.isEditable = !this.isEditable; // Toggle the edit mode
}

saveUserDetails(): void {
  if (this.isEditable) {
    // Code for saving the updated user details
    const data = sessionStorage.getItem('loggedInUser');
    let user: User | null = null; // Declare 'user' properly
    if (data) {
      const user = JSON.parse(data);
      this.loggedInUser = user.userId; // Use the parsed user data
    } else {
      // Handle case where user data is not in sessionStorage
      console.error('No loggedInUser found in sessionStorage');
      return;
    }    
    const updatedUser :Partial<User> = {
      userId:this.loggedInUser as number, 
      username: this.username,
      email: this.email,
      phone: this.phone,
    };

   // Call the service to update user details
   this.userService.updateUser(this.loggedInUser as number, updatedUser as User).subscribe(
    (response) => {
      // If the update is successful, update sessionStorage and disable the fields
     // Update sessionStorage and disable the fields if successful
    if (user) {
          sessionStorage.setItem('loggedInUser', JSON.stringify({...updatedUser }));
        }
        this.isEditable = false;


        Swal.fire({
          title: 'Success!',
          text: 'User details updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
    },
    (error) => {
      // Handle any errors that occur during the update
      console.error('Error updating user details:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update user details.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
    }
  );
  }
}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe from all subscriptions
  }
}

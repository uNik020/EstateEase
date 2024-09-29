import { Component, OnInit } from '@angular/core';
import { Property } from '../../entities/property';
import { PropertyService } from '../../service/property.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { WishlistService } from '../../service/wishlist.service';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrl: './property-listing.component.css'
})

export class PropertyListingComponent implements OnInit {
  // This array will contain all the properties fetched from the backend
  properties: Property[] = [];
  loggedInUser: number | null = null;
  showNavbar: boolean = true;

  // This array will contain the filtered properties based on the button clicked
  filteredProperties: Property[] = [];

  constructor(private authService: AuthService,private wishlistService: WishlistService, private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    // Check the current route
if (this.router.url === '/home-page') {
  this.showNavbar = false; // Don't show the navbar if it's the home page
}
    this.getLoggedInUser();
    this.loadProperties();
  }

  getLoggedInUser(): void {
    // Check if window and sessionStorage are available (browser environment)
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined' && typeof localStorage !== 'undefined') {
      const userString = sessionStorage.getItem('loggedInUser');
      
      if (userString) {
        try {
          const user = JSON.parse(userString); // Parse the user object
          this.loggedInUser = user?.userId; // Access the userId
  
          if (this.loggedInUser) {
            this.loadProperties();
          } else {
            console.error('User ID not found in the user object');
          }
        } catch (error) {
          console.error('Error parsing user object from sessionStorage', error);
        }
      } else {
        console.error('No logged-in user object found in session storage');
      }
    } else {
      console.error('sessionStorage is not available (non-browser environment)');
    }
  }
  

  // Function to load properties from the backend except those posted by the logged-in user
  // loadProperties(): void {
  //   if (this.loggedInUser !== null) {
  //     console.log('Fetching properties with userId:', this.loggedInUser); // Debug log
  //     this.propertyService.getAvailableProperties(this.loggedInUser).subscribe(
  //       (data: Property[]) => {
  //         console.log('Properties fetched:', data); // Debug log
  //         this.properties = data;
  //         this.filterAll();  // Initially display all properties
  //       },
  //       (error) => {
  //         console.error('Error fetching available properties', error);
  //       }
  //     );
  //   } else {
  //     console.error('Logged-in user ID is null');
  //   }
  // }
  loadProperties(): void {
    if (this.loggedInUser !== null) {
      console.log('Fetching properties with userId:', this.loggedInUser); // Debug log
      this.propertyService.getAvailableProperties(this.loggedInUser).subscribe(
        (data: Property[]) => {
          console.log('Properties fetched:', data); // Debug log
          this.properties = data;
          this.filterAll();  // Initially display all properties
        },
        (error) => {
          console.error('Error fetching available properties', error);
        }
      );
    } else {
      this.propertyService.getAllProperties().subscribe(
        (data: Property[]) => {
          this.properties = data;
          this.filterAll();  // Initially display all properties
        },
        (error) => {
          console.error('Error fetching all properties', error);
        }
      );
    }
  }
  
  

  // Function to display all properties
  filterAll(): void {
    this.filteredProperties = this.properties;
  }

  // Function to filter properties with status 'for sell'
  filterForSell(): void {
    this.filteredProperties = this.properties.filter(property => property.propertyStatus === 'For Sell');
  }

  // Function to filter properties with status 'for rent'
  filterForRent(): void {
    this.filteredProperties = this.properties.filter(property => property.propertyStatus === 'For Rent');
  }

  // Method to navigate to property details
  navigateToDetails(propertyId: number): void {
    console.log(`Clicked propertyId: ${propertyId}`); // testing purpose
    this.router.navigate(['/property-details', propertyId]);
  }

  // Check if the property is already favorited
  isFavorited(propertyId: number): boolean {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(propertyId);
  }

  // Toggle favorite status for the property
  toggleFavorite(propertyId: number, event: MouseEvent): void {
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
  }

  // Load favorites from localStorage
  loadFavorites(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Optionally, you can map favorites to your property data here
  }

  
}

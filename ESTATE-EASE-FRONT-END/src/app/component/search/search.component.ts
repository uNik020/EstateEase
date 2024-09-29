import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Property } from '../../entities/property';
import { WishlistService } from '../../service/wishlist.service';
import { PropertyService } from '../../service/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  price: number|null = null; 
  size: number|null = null; 
  propertyTypes: string[] = [];  // For selected property types
  bedrooms: string[] = [];       // For selected bedrooms
  bathrooms: string[] = [];      // For selected bathrooms
  searchQuery: string = '';      // For search bar
  noPropertiesFound: boolean = false;
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  loggedInUser: number | null = null;
  showNavbar: boolean = true;
  searchApplied: boolean = false; // To control when to display filtered properties
   // Define options for bedrooms and bathrooms
   bedroomOptions: string[] = ['1', '2', '3', '4', '5'];
   bathroomOptions: string[] = ['1', '2', '3', '4', '5'];

     // Selected Property Types (Checkboxes)
  selectedPropertyTypes: { [key in 'apartment' | 'house' | 'villa' | 'plot']: boolean } = {
    apartment: false,
    house: false,
    villa: false,
    plot: false
  };

  selectedBedrooms: { [key: string]: boolean } = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false
  };

  selectedBathrooms: { [key: string]: boolean } = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false
  };

  constructor(
    private authService: AuthService,
    private wishlistService: WishlistService,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/home-page') {
      this.showNavbar = false;
    }
    this.getLoggedInUser();
   
    this.loadProperties();
  }

  getLoggedInUser(): void {
    const userString = sessionStorage.getItem('loggedInUser');
    if (userString) {
      const user = JSON.parse(userString);
      this.loggedInUser = user?.userId;
      if (this.loggedInUser) {
        this.loadProperties();
      } else {
        console.error('User ID not found in the user object');
      }
    } else {
      console.error('No logged-in user object found in session storage');
    }
  }

  loadProperties(): void {
    if (this.loggedInUser !== null) {
      this.propertyService.getAvailableProperties(this.loggedInUser).subscribe(
        (data: Property[]) => {
          this.properties = data;
          this.filterAll();
        },
        (error) => {
          console.error('Error fetching available properties', error);
        }
      );
    } else {
      this.propertyService.getAllProperties().subscribe(
        (data: Property[]) => {
          this.properties = data;
          this.filterAll();
        },
        (error) => {
          console.error('Error fetching all properties', error);
        }
      );
    }
  }

  // Display all properties
  filterAll(): void {
    this.filteredProperties = this.properties;
  }

  // Status filters (already implemented)
  filterForSell(): void {
    this.filteredProperties = this.properties.filter(property => property.propertyStatus === 'For Sell');
  }

  filterForRent(): void {
    this.filteredProperties = this.properties.filter(property => property.propertyStatus === 'For Rent');
  }

  // Apply filters for property type, price, size, bedrooms, and bathrooms
  applyFilters(): void {
    this.searchApplied = true; // Mark search as applied to display results

    this.filteredProperties = this.properties.filter(property => {
      // Property Type filter (checkboxes)
      const selectedTypes = Object.keys(this.selectedPropertyTypes).filter(type => this.selectedPropertyTypes[type as keyof typeof this.selectedPropertyTypes]);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.propertyType.toLowerCase());

      // Price filter
      const matchesPrice = this.price == null || property.price <= this.price;

      // Size filter
      const matchesSize = this.size == null || property.area <= this.size;

      // Bedrooms filter (checkboxes) - Convert both property.bedrooms and selected options to strings for comparison
    const selectedBeds = Object.keys(this.selectedBedrooms).filter(bed => this.selectedBedrooms[bed as keyof typeof this.selectedBedrooms]);
    const matchesBedrooms = selectedBeds.length === 0 || selectedBeds.includes(property.bedrooms.toString());

    // Bathrooms filter (checkboxes) - Convert both property.bathrooms and selected options to strings for comparison
    const selectedBaths = Object.keys(this.selectedBathrooms).filter(bath => this.selectedBathrooms[bath as keyof typeof this.selectedBathrooms]);
    const matchesBathrooms = selectedBaths.length === 0 || selectedBaths.includes(property.bathrooms.toString());

      return matchesType && matchesPrice && matchesSize && matchesBedrooms && matchesBathrooms;
    });
  }

  // Clear all filters
  clearFilters(): void {
    this.propertyTypes = [];
    this.price = null;
    this.size = null;
    this.bedrooms = [];
    this.bathrooms = [];
    this.searchQuery = '';
    this.searchApplied = false;

    // Reset checkbox selections
    this.selectedPropertyTypes = {
      apartment: false,
      house: false,
      villa: false,
      plot: false
    };
    this.selectedBedrooms = {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false
    };
    
    this.selectedBathrooms = {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false
    };
    this.filterAll();
  }

  // Toggle property type selection (checkbox)
  togglePropertyType(type: keyof typeof this.selectedPropertyTypes): void {
    this.selectedPropertyTypes[type] = !this.selectedPropertyTypes[type];
  }

  // Toggle bedroom selection (checkbox)
  toggleBedrooms(bedroom: keyof typeof this.selectedBedrooms): void {
    this.selectedBedrooms[bedroom] = !this.selectedBedrooms[bedroom];
  }

  // Toggle bathroom selection (checkbox)
  toggleBathrooms(bathroom: keyof typeof this.selectedBathrooms): void {
    this.selectedBathrooms[bathroom] = !this.selectedBathrooms[bathroom];
  }

  // Search function for the search bar
  searchProperties(): void {
    console.log("Searching for:",this.searchQuery);

    if (this.searchQuery) {
      this.filteredProperties = this.properties.filter(property => 
        property.location.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.location.state.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.location.country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.location.pin.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.price.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.area.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.description.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      
      // Check if any properties were found
      this.noPropertiesFound = this.filteredProperties.length === 0;
    } else {
      this.filteredProperties = this.properties; // Reset to all properties if search term is empty
      this.noPropertiesFound = false; // Reset the message
    }
  }

  // Navigate to property details (already implemented)
  navigateToDetails(propertyId: number): void {
    this.router.navigate(['/property-details', propertyId]);
  }

  // Check if a property is favorited
  isFavorited(propertyId: number): boolean {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(propertyId);
  }

  // Toggle favorite status for a property
  toggleFavorite(propertyId: number, event: MouseEvent): void {
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(propertyId)) {
      favorites = favorites.filter((id: number) => id !== propertyId);
    } else {
      favorites.push(propertyId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

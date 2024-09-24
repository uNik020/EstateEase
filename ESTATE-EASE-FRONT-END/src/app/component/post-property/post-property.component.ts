import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Property } from '../../entities/property';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from '../../service/property.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


interface StatesCities {
  [key: string]: string[];
}

@Component({
  selector: 'app-postpro',
  templateUrl: './post-property.component.html',
  styleUrl: './post-property.component.css'
})

export class PostPropertyComponent implements OnInit {
  getPid: any = sessionStorage.getItem("propertyId");
  propertyId: number = 0;
  propertyType: string[] = ['Apartment', 'House', 'Plot', 'Villa'];
  propertyStatus: string[] = ['For Sell', 'For Rent'];
  bedroomOptions: number[] = [0, 1, 2, 3, 4, 5];
  bathroomOptions: number[] = [0, 1, 2, 3, 4, 5];
  
  owner: number = 0;
  username: string | null = null;
  contactNumber: string | null = null;
  email: string | null = null;
  isLoggedIn: boolean = false;
  userName: string | null = null;

  isPlot: boolean = false;  // New flag for disabling fields
  
  private subscriptions: Subscription = new Subscription();
  
  propertyDetails: Property = new Property(
    0, // propertyId
    '', // type
    0, // price
    { // location (Location object)
      city: '',
      state: '',
      country: '',
      pin: ''
    },
    0, // area
    '', // description
    '', // propertyImgPath
    0, // bedrooms
    0, // bathrooms
    '',  // status
    0
  );

  selectedFileName: string = '';

  constructor(
    private propertyService: PropertyService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Fetch ownerId from sessionStorage
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.owner = user.userId; // Assuming user object has userId field
      this.propertyDetails.owner = this.owner;
    }

    if (this.getPid != null) {
      this.propertyId = parseInt(this.getPid);
      this.propertyDetails.propertyId = this.propertyId;
    }

    if (isPlatformBrowser(this.platformId)) {
      const storedUser = sessionStorage.getItem('loggedInUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.username = user.username; // Get username from user object
        this.contactNumber = user.phone; // Get contact number from user object (adjust key if different)
        this.email = user.email; // Get email from user object
        this.owner = user.userId; // Set ownerId based on logged-in user
        this.propertyDetails.owner = this.owner;
      }
    }

    // Subscribe to AuthService observables
    this.subscriptions.add(
      this.authService.isAuthenticated().subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
      })
    );

    this.subscriptions.add(
      this.authService.getUserName().subscribe(name => {
        this.userName = name;
      })
    );
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.propertyDetails.propertyImgPath = this.selectedFileName;
    }
  }

  // Submit the form
  onSubmit() {
    console.log(this.propertyDetails);
    
    if (this.isLoggedIn) {
      this.propertyDetails.owner = this.owner; // Set the logged-in user ID as ownerId
      this.propertyService.addProperty(this.propertyDetails).subscribe(
        response => {
          Swal.fire({
            title: 'Property Posted Successfully!',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/user-dashboard'], { fragment: 'MyListings' });
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'An unexpected error occurred. Please check the form and try again.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'You must be logged in to post a property.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  onPropertyTypeChange() {
    if (this.propertyDetails.propertyType === 'Plot') {
      this.isPlot = true;
    } else {
      this.isPlot = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Contact } from '../../entities/contact';
import { UserService } from '../../service/user.service';
import { Email } from '../../entities/email';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class ContactPageComponent implements OnInit {

  contact: Contact = new Contact(0, "", "", "", true);

  username: string = '';
  email: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') { 
      const storedUser = sessionStorage.getItem('loggedInUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.username = user.username; // Assuming 'username' is part of the user object
        this.email = user.email;       // Assuming 'email' is part of the user object
      }
    }

    // Set the contact form fields with the logged-in user's details
    this.contact.contact_name = this.username;
    this.contact.contact_email = this.email;
  }

  onSubmit() {
    this.userService.saveContactUs(this.contact).subscribe((data: any) => {
      if (data != null) {
        Swal.fire({
          icon: 'info',
          title: 'Contact Us',
          text: 'We will get back to you!',
        });

        // Retrieve userId from the logged-in user object for redirection
        const storedUser = sessionStorage.getItem('loggedInUser');
        const userId = storedUser ? JSON.parse(storedUser).userId : null;

        // Navigate to the dashboard using the user's ID
        this.router.navigate(['dashboard', userId ? userId : 0]); // Handle null userId safely
      }
    });
  }
}
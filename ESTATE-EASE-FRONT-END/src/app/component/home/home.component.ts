import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WOW } from 'wowjs';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected `styleUrl` to `styleUrls`
})
export class HomeComponent {
//   private isBrowser: boolean;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   ngOnInit(): void {
//     // Spinner
//     const spinner = (): void => {
//       setTimeout(() => {
//         const spinnerElement = $('#spinner');
//         if (spinnerElement.length > 0) {
//           spinnerElement.removeClass('show');
//         }
//       }, 1);
//     };
//     spinner();
//   }

//   ngAfterViewInit(): void {
//     if (this.isBrowser) {
//     // Initialize WOW.js
//     new WOW().init();

//     // Sticky Navbar
//     $(window).on('scroll', () => {
//       if ($(window).scrollTop() > 45) {
//         $('.nav-bar').addClass('sticky-top');
//       } else {
//         $('.nav-bar').removeClass('sticky-top');
//       }
//     });

//     // Back to top button
//     $(window).on('scroll', () => {
//       if ($(window).scrollTop() > 300) {
//         $('.back-to-top').fadeIn('slow');
//       } else {
//         $('.back-to-top').fadeOut('slow');
//       }
//     });

//     $('.back-to-top').on('click', () => {
//       $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
//       return false;
//     });

//     // Header carousel
//     $(".header-carousel").owlCarousel({
//       autoplay: true,
//       smartSpeed: 1500,
//       items: 1,
//       dots: true,
//       loop: true,
//       nav: true,
//       navText: [
//         '<i class="bi bi-chevron-left"></i>',
//         '<i class="bi bi-chevron-right"></i>'
//       ]
//     });

//     // Testimonials carousel
//     $(".testimonial-carousel").owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       margin: 24,
//       dots: false,
//       loop: true,
//       nav: true,
//       navText: [
//         '<i class="bi bi-arrow-left"></i>',
//         '<i class="bi bi-arrow-right"></i>'
//       ],
//       responsive: {
//         0: {
//           items: 1
//         },
//         992: {
//           items: 2
//         }
//       }
//     });
//   }
// }
}

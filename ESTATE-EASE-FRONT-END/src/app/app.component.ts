import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import 'animate.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Fix the typo here: `styleUrls` should be plural
})
export class AppComponent implements AfterViewInit {
  title = 'Estate-Ease';
  isLoading = true;

  constructor(private router: Router, private spinner: NgxSpinnerService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const cursor: NodeListOf<HTMLElement> = document.querySelectorAll(".cursor");
      const links: NodeListOf<HTMLElement> = document.querySelectorAll(".link, .user-name, .hero-section h1, .project-name");
  
      console.log(cursor, links);
  
      if (cursor.length === 0 || links.length === 0) {
        console.error('Cursor or Links not found in DOM.');
        return;
      }
  
      window.addEventListener("mousemove", (e: MouseEvent) => {
        const x: number = e.pageX;
        const y: number = e.pageY;
  
        cursor.forEach(el => {
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        });
      });
  
      links.forEach(link => {
        link.addEventListener("mouseenter", () => {
          cursor.forEach(el => el.classList.add("hover"));
        });
  
        link.addEventListener("mouseleave", () => {
          cursor.forEach(el => el.classList.remove("hover"));
        });
      });
    }, 0); // You can increase the delay if needed (e.g., 100ms)
  }
  

  // Spinner setup method
  openSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit() {
    this.openSpinner();
  }
}

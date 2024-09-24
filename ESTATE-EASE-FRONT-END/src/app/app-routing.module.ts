import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { PropertyListingComponent } from './component/property-listing/property-listing.component';
import { PropertyDetailsComponent } from './component/property-details/property-details.component';
import { PostPropertyComponent } from './component/post-property/post-property.component';
import { FooterComponent } from './component/footer/footer.component';
import { ContactPageComponent } from './component/contact-page/contact-page.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { AboutPageComponent } from './component/about-page/about-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' }, // Default route/ will change after adding home page
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'forgotpass', component:ForgotpassComponent},
  { path: 'home-page', component:HomePageComponent},
  { path: 'property-listing', component: PropertyListingComponent },
  { path: 'property-details/:id', component: PropertyDetailsComponent },
  { path: 'post-property', component: PostPropertyComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'about-page', component: AboutPageComponent},
  
  { path: '**', redirectTo: '/home-page' } // Wildcard route for handling 404
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

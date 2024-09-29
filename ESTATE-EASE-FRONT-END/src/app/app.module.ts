import { NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PropertyListingComponent } from './component/property-listing/property-listing.component';
import { PropertyDetailsComponent } from './component/property-details/property-details.component';
import { PostPropertyComponent } from './component/post-property/post-property.component';
import { FooterComponent } from './component/footer/footer.component';
import { ContactPageComponent } from './component/contact-page/contact-page.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { AboutPageComponent } from './component/about-page/about-page.component';
import { SearchComponent } from './component/search/search.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpassComponent,
    HomePageComponent,
    NavbarComponent,
    PropertyListingComponent,
    PropertyDetailsComponent,
    PostPropertyComponent,
    FooterComponent,
    ContactPageComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AboutPageComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot()

  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

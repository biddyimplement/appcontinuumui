import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppServiceService} from '../app/app-service.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateProjectComponent } from './create-project/create-project.component'

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    MatIconModule,
  ],
  providers: [AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

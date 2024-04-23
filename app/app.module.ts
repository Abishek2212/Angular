import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, FormArray } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterviewComponent } from './interview/interview.component';
import { HomeComponent } from './home/home.component';
import { PositionComponent } from './position/position.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SupportComponent } from './support/support.component';
import { SignupComponent } from './signup/signup.component';

import { InterviewService } from './interview.service';
import { StatusComponent } from './status/status.component';




@NgModule({
  declarations: [
    AppComponent,
    InterviewComponent,
    HomeComponent,
    PositionComponent,
    RegisterComponent,
    LoginComponent,
    SupportComponent,
    SignupComponent,
    StatusComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    InterviewService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

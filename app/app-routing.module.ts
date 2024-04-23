import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InterviewComponent } from './interview/interview.component';
import { PositionComponent } from './position/position.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SupportComponent } from './support/support.component';
import { SignupComponent } from './signup/signup.component';
import { StatusComponent } from './status/status.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'interview', component: InterviewComponent},
  {path:'position', component: PositionComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'support', component: SupportComponent},
  {path:'signup', component:SignupComponent},
  {path:'status', component:StatusComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchCourseComponent } from './search-course/search-course.component';
import { LmsGuardGuard } from '../lms-guard.guard';

const routes:Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }, 
  { path: "SearchCourse", component: SearchCourseComponent ,canActivate: [LmsGuardGuard] }
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    SearchCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModuleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCourseComponent } from './create-course/create-course.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes:Routes = [
  { path: "login", component: LoginComponent },
  { path: "createCourse", component: CreateCourseComponent },
  { path: "CourseList", component: ListCourseComponent  },
 
]

@NgModule({
  declarations: [
    CreateCourseComponent,
    ListCourseComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ]
})
export class AdminModule { }

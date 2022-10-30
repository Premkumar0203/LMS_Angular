import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LmsService } from 'src/app/lms.service';


@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {

  constructor(private service:LmsService,private router: Router) { }

  errorMessage ="";

  Course:any =[];

  ngOnInit(): void {
      this.findAllCourse();
  }

  findAllCourse()
  {

    this.service.findAllCourse().subscribe({
            next: (res:any)=>{
                console.log(res);
                this.Course = res;
            },
            error: (err:any)=>{
                console.log(err)
            }
    })
}

  CreateCourse()
  {
    this.router.navigateByUrl('/Admin/createCourse');

  }

  deleteCourse(courseName:any)
  {
    console.log("Inside deleteCourse");
    this.service.deletCourse(courseName).subscribe({
      next: (res:any)=>{
          console.log("next--->"+res);
          this.Course = res;
          if(this.Course.message == 200)
          {
            console.log("Before Navigation");
            this.findAllCourse();
          }
          if(this.Course.message != null)
          {
            this.errorMessage = this.Course.message;
          }
         
      },
      error: (err:any)=>{
        if(err.status == 200)
          {
            console.log("Before Navigation");
            this.findAllCourse();
          }else
          {
            this.errorMessage = "Error Occured";
            console.log("Error--->Error Occured");
          }
        }
})
  }

}

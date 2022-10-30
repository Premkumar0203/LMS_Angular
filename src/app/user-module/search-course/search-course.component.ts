import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LmsService } from 'src/app/lms.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {

  myForm : FormGroup;

  constructor(private service:LmsService,private cookieService: CookieService) {
    this.myForm = new FormGroup({
      courseName: new FormControl(""),
      technology: new FormControl(""),
      duration: new FormControl("")});

   }

  errorMessage ="";

  Course:any =[];


  ngOnInit(): void {
  }

  token:any =  "";
 
  SearchBook()
  {
    this.Course = [];
    this.errorMessage ="";
    this.token =  this.cookieService.get('TokenId');
    console.log("cousename -->"+this.myForm.value.courseName);
    console.log("technology -->"+this.myForm.value.technology)
    if(this.myForm.value.courseName.length != 0 || this.myForm.value.technology.length != 0 )
    {
      this.service.findCourse(this.token,this.myForm.value.technology,this.myForm.value.courseName,
        this.myForm.value.duration).subscribe({
        next: (res:any)=>{
            console.log(res);
            this.Course = res;
        },
        error: (err:any)=>{
          console.log("error-->"+err.error.message);
          this.errorMessage = err.error.message;
 
          }
        })
    }
    else
    {
      this.errorMessage = "Please, enter either CourseName or Technology"
    }
    

  }

  courseAdd(courseId:any)
  {
    this.service.AddCourse(this.cookieService.get('TokenId'),courseId).subscribe({
      next: (res:any)=>{
          console.log(res);
          this.Course = res;
          if(res.registerId != 0)
            this.errorMessage = "Course Subscription completed"
      },
      error: (err:any)=>{
        console.log("error-->"+err.message);
        this.errorMessage = err.error.message;

        }
      })

     
  }

}



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LmsService } from 'src/app/lms.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  myForm : FormGroup;

  token:any = "";

  constructor(private service:LmsService,private router: Router) { 
    this.myForm = new FormGroup({
      courseName: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z\\s+]{20,45}")]),
      duration: new FormControl("",[Validators.required,Validators.pattern("[0-9]{1,3}")]),
      description: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{100,150}")]),
      launchUrl: new FormControl("",[Validators.required]),
      technology: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{1,15}")])
    });

  }

  errorMessage ="";
  course:any= [];
  
  ngOnInit(): void {
  }

  createCourse()
  {

    const registerJson  = {
          "courseName": this.myForm.value.courseName,
          "duration":this.myForm.value.duration,
          "description": this.myForm.value.description,
          "launchUrl": this.myForm.value.launchUrl,
          "technlogy":this.myForm.value.technology
   };
   console.log("Token :"+ this.token);
   console.log("Category :"+this.myForm.value.genre);
    this.service.CreateBook(this.token,registerJson).subscribe({
            next: (res:any)=>{
                console.log(res);
                this.course = res;
                if(this.course.courseId > 0)
                {
                  console.log("Before Navigation");
                  this.router.navigateByUrl('/Admin/CourseList');
                }
            },
            error: (err:any)=>{
                console.log(err)
            }
    })

  }

}

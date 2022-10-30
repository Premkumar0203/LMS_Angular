import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LmsService } from 'src/app/lms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = "";

  myForm : FormGroup;

  constructor(private service:LmsService)
  {
    this.myForm = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z]{5,15}")]),
      emailId: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@.]{12,25}")]),
      password1: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{5,15}")]),
      password2: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{5,15}")])
    });
  }
  ngOnInit(): void
   {
  }

  data:any = [];

  Register()
  {
    
    if(this.myForm.value.password1 != this.myForm.value.password2)
    {
      this.errorMessage = "The Password and Repeat Password must be Same";
    }else
    {
    const registerJson  = {"userName": this.myForm.value.name,
    "emailId":this.myForm.value.emailId,
     "password":this.myForm.value.password1 };
    this.service.RegisterUser(registerJson)
    .subscribe({
     next: (res:any)=>{
         console.log("Response :"+res);
         this.data = [];
         this.data = res;
         this.errorMessage ="";
         if(this.data.userId > 0)
        {
                        this.errorMessage = "User Creation Done";
                        console.log("errorMessage"+ (this.errorMessage))
                        this.data = [];
        }

     },
     error: (err:any)=>{
         console.log(err)
         this.errorMessage = err.error.message;
     }
 })
  }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/author.service';
import { LmsService } from 'src/app/lms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = "";

  myForm : FormGroup;

  constructor(private service:LmsService, private cookieservice: CookieService,
    private router: Router,private user:User)
  {
    
    this.myForm = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z]{5,15}")]),
      password: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{5,15}")]),
    });
  }
  ngOnInit(): void
   {
  }

  data:any = [];

  Login()
  {
 
    this.user.name= this.myForm.value.name;
    const registerJson  = { "username": this.myForm.value.name,
     "password":this.myForm.value.password };
    this.service.Login(registerJson)
    .subscribe({
     next: (res:any)=>{
         this.data = [];
         this.data = res;
         this.errorMessage ="";

          if(this.data.token != null)
            {
              this.cookieservice.set("TokenId", this.data.token);
              this.errorMessage = this.data.message;
              console.log("Token"+ (this.data.token))
              this.data = [];
              this.user.valid = true;
              this.router.navigateByUrl('/User/SearchCourse');

            }
     },
     error: (err:any)=>{
         console.log("error-->"+err.statusText);
         this.errorMessage = err.statusText;

     }
 })

  }

}

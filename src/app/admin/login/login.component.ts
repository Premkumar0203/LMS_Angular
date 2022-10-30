import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm : FormGroup ;

  constructor(private router: Router) { 
    this.myForm = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z]{5,15}")]),
      password: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z0-9@#]{9,15}")]),
    });
  }

  ngOnInit(): void {
    
  }

  errorMessage: string = "";

  Login()
  {
    if(this.myForm.value.name == "admin" && this.myForm.value.password == "admin@123")
    {
      this.router.navigateByUrl('/Admin/CourseList');
    }
    else
    {
      this.errorMessage = "invalid Credientials";
    }

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LmsService {
 
  constructor(private http:HttpClient) { }

  ipAddress:string = "http://localhost:";
  port:string  = "9080";

  findAllCourse()
  {
    return this.http.get(this.ipAddress+this.port+"/api/v1.0/lms/admin/courses/getall");
  }

  deletCourse(courseName:String)
  {
      return this.http.get(this.ipAddress+this.port+"/api/v1.0/lms/admin/courses/delete/"+courseName);
  }

  RegisterUser(registerJson: { userName: String;emailId:String; password: String; })
  {
    let url = this.ipAddress+this.port+"/api/v1.0/lms/company/register"; 
    console.log(url);
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(registerJson);
    console.log(body)
    return this.http.post(url,body,{'headers':headers});
  }

  Login(registerJson: { username: any; password: any; })
    {
        let url = this.ipAddress+this.port+"/api/v1.0/lms/company/login";
        console.log(url);
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(registerJson);
        console.log(body)
        return this.http.post(url,body,{'headers':headers});
    }

    findCourse(token:String,technology:String,courseName:String,duration:number)
    {
      let url = "";
      if(courseName.length != 0)
      {
         url = this.ipAddress+this.port+ "/api/v1.0/lms/courses/view/"+courseName;
      }
      else if(technology.length != 0 && duration != 0)
      {
         url =this.ipAddress+this.port+ "/api/v1.0/lms/courses/info/"+technology + "/1/"+duration;
      }
      else if(technology.length != 0 && duration == 0)
      {
        url =this.ipAddress+this.port+ "/api/v1.0/lms/courses/info/"+technology;
      }
      return this.http.get(url, {headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}` )});
    }

    AddCourse(token:String,courseId:String)
    {
        let url = this.ipAddress+this.port+ "/api/v1.0/lms/courses/register/"+courseId;
        return this.http.get(url, {headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}` )
          .set('content-type','application/json')} );
    }

    CreateBook(token: any, 
      registerJson: { courseName: String; duration: String; 
        description: String; launchUrl: String; technlogy: String; }) {

          const body=JSON.stringify(registerJson);
          console.log(body)
          let url = this.ipAddress+this.port+ "/api/v1.0/lms/admin/courses/add/";
          return this.http.post(url,body, {headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}` )
          .set('content-type','application/json')} );

     
    }


}

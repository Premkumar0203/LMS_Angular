import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './author.service';
import { LmsService } from './lms.service';

@Injectable({
  providedIn: 'root'
})
export class LmsGuardGuard implements CanActivate {

  constructor(private user:User,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree
    {
      if(!this.user.valid )
      {
        alert('You are not allowed to view this page. You are redirected to login Page'); 
        this.router.navigate(["/User/login"]);
        return false;
      }
      return true;
  }
  
}

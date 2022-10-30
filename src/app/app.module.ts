import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes:Routes = [
  { path: 'Admin', loadChildren: ()=>import("./admin/admin.module")
              .then(module=>module.AdminModule) },
  { path: 'User', loadChildren: ()=>import("./user-module/user-module.module")
              .then(module=>module.UserModuleModule) },
  { path: '**', redirectTo: '/' }
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
   
  ],
  exports: [ RouterModule ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

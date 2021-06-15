import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public user_access_token: any = '';
  public mobile: any = '';
  constructor(private router: Router) {}
  ngOnInit() {
    this.mobile = localStorage.getItem("mobile");
    console.log(this.mobile);
  }
logout(){
  localStorage.removeItem("user_token");
  localStorage.removeItem("mobile");
  localStorage.removeItem('withoutLogin');
  this.user_access_token = "";
  this.router.navigate(['/loginpage']);
}
}

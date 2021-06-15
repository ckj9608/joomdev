import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {
public mobile: number;
public user_access_token: any = '';
public mobileno: any = '';
  public withoutLogin:boolean;
  constructor(private router: Router, public toastCtrl: ToastController, private uniqueDeviceID: UniqueDeviceID) { }

  ngOnInit() {
    
  }
  validatePhone(phone) { 
		var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; 
		return phoneRegex.test(phone);
	}
  async presentToast(txt:any) {
		let toast = this.toastCtrl.create({
			message: txt,
			duration: 3000,
			position: 'bottom'
		});
		(await toast).present();
	}

  navigate(){
    if(!this.validatePhone(this.mobile)) {
      this.presentToast('Enter valid mobile number');
    }
    else{
      //this.router.navigate(['/otp-verify']);
      this.mobileno = this.mobile;
      this.getDeviceToken();
    }
    
  }
  getDeviceToken() {
    this.uniqueDeviceID.get()
      .then((uuid: any) =>{
        console.log(uuid)
        this.user_access_token = uuid;
        this.withoutLogin = true;
        localStorage.setItem("user_token", uuid);
        localStorage.setItem("mobile", this.mobileno);
        localStorage.setItem('withoutLogin','true');
        this.router.navigate(['/otp-verify']);
      })
      .catch((error: any) =>{
         console.log(error);
        //  this.global.user_access_token = "56522522522555222";
        //  localStorage.setItem("user_token", "56522522522555222");
        //  localStorage.setItem('withoutLogin','true');
        //  this.global.withoutLogin = true;
        //  this.navCtrl.navigateRoot(['/home']);
      });
  }
}

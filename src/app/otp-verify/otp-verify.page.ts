import { Component, OnInit, ViewChild} from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.page.html',
  styleUrls: ['./otp-verify.page.scss'],
})
export class OtpVerifyPage implements OnInit {
  public user_access_token: any = '';
  public mobile: any = '';
  public withoutLogin:boolean;
  public otp1:string="";
  public otp2:string="";
  public otp3:string="";
  public otp4:string="";
  public otp5:string="";
  public otp6:string="";
  @ViewChild('passcode1',{static: false}) passcode1;
  @ViewChild('passcode2',{static: false}) passcode2;
  @ViewChild('passcode3',{static: false}) passcode3;
  @ViewChild('passcode4',{static: false}) passcode4;
  @ViewChild('passcode5',{static: false}) passcode5;
  @ViewChild('passcode6',{static: false}) passcode6;
  
  constructor(private router: Router, private uniqueDeviceID: UniqueDeviceID, public toastCtrl: ToastController) { }

  ngOnInit() {
    let mobilenos = localStorage.getItem("mobile");
    this.mobile = mobilenos.substr(-4);
    console.log(this.mobile);
    
  }
  async presentToast(txt:any) {
		let toast = this.toastCtrl.create({
			message: txt,
			duration: 3000,
			position: 'bottom'
		});
		(await toast).present();
	}
  location() {
    if(this.otp1 && this.otp2 && this.otp3 && this.otp4 && this.otp5 && this.otp6){
      this.submitOtp();
    }else{
      this.presentToast("OTP cannot be blank");
    }
  }  
  submitOtp(){
    this.router.navigate(['/home']);
  }
  onKeyUp(event,index){
    console.log(event);
    console.log("index : ", index);
    if(event.target.value.length !=1){
      this.setFocus(index-2);  
    }else{
      // this.values.push(event.target.value);  
      this.setFocus(index);   
    }
    event.stopPropagation();
  }

  setFocus(index){
       
    switch(index){
      case 0:
      this.passcode1.setFocus();
      break;
      case 1:
      this.passcode2.setFocus();
      break;
      case 2:
      this.passcode3.setFocus();
      break;
      case 3:
      this.passcode4.setFocus();
      break;
      case 4:
      this.passcode5.setFocus();
      break;
      case 5:
      this.passcode6.setFocus();
      break;
      }
 }
 getDeviceToken() {
  this.uniqueDeviceID.get()
    .then((uuid: any) =>{
      console.log(uuid)
      this.user_access_token = uuid;
      this.withoutLogin = true;
      localStorage.setItem("user_token", uuid);
      localStorage.setItem('withoutLogin','true');
      this.router.navigate(['/home']);
    })
    .catch((error: any) =>{
       console.log(error);
      
    });
}

}

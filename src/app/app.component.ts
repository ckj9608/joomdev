import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public user_access_token: any = '';
  public withoutLogin:boolean;
  public userdetails: any = {};
  public activeLocation:any={};
  public appPages:any = [
    {
      title: 'home',
      sub_title: 'welcome',
      url: '/home',
      icon: 'zmdi zmdi-store ion-text-start',
      withoutLogin:true
    },
    {
      title: 'otp-verify',
      sub_title: 'welcome',
      url: '/otp-verify',
      icon: 'zmdi zmdi-store ion-text-start',
      withoutLogin:false
    },
    {
      title: 'login',
      sub_title: 'login',
      url: '/loginpage',
      icon: 'zmdi zmdi-cutlery ion-text-start',
      withoutLogin:false
    }
  ]
  constructor(private platform: Platform, private uniqueDeviceID: UniqueDeviceID, private navCtrl: NavController, private _location: Location,
    public alertController: AlertController ) {
    this.initializeApp();
  }
  initializeApp() {
    
    
    this.platform.ready().then(() => {

      /* ==== Find Already Login or Not =========== */
      let userAuthToken = localStorage.getItem("user_token")
      let userdetails = localStorage.getItem("userdetails");
      let withoutLogin = localStorage.getItem("withoutLogin");
      
      if (withoutLogin == undefined && userAuthToken != undefined) {
        this.user_access_token = userAuthToken;
        // this.userdetails = JSON.parse(userdetails);
         let locationData = localStorage.getItem("mobile")
        localStorage.removeItem("withoutLogin");
        this.withoutLogin = undefined;
         if (locationData) {
           this.activeLocation = JSON.parse(locationData);
         }
       // console.log("user token : ", this.global.user_access_token);
        this.navCtrl.navigateRoot(['/home']);
        // this.navCtrl.navigateRoot(['./create-group']);
      } else if (withoutLogin) {
        
        this.getDeviceToken()
      } else {
        this.navCtrl.navigateRoot(['/loginpage']);
      }

    });
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/home')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } 
      else if(this._location.isCurrentPathEqualTo('/loginpage')){
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      }
      else {

        // Navigate to back page
        console.log('Navigate to back page');
        this._location.back();

      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });

  }

  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });

  }

  


  getDeviceToken() {
    this.uniqueDeviceID.get()
      .then((uuid: any) =>{
        console.log(uuid)
        this.user_access_token = uuid;
        localStorage.setItem("user_token", uuid);
        localStorage.setItem('withoutLogin','true');
        this.withoutLogin = true;
        this.navCtrl.navigateRoot(['/home']);
      })
      .catch((error: any) =>{
        console.log(error);
        // this.global.user_access_token = "56522522522555222";
        // localStorage.setItem("user_token", "56522522522555222");
        // localStorage.setItem('withoutLogin','true');
        // this.global.withoutLogin = true;
        // this.navCtrl.navigateRoot(['/home']);
      });
  }
  login(){
    console.log('hi')
    localStorage.removeItem("user_token");
    localStorage.removeItem("userdetails");
    localStorage.removeItem("loactions");
    localStorage.removeItem("withoutLogin");
    this.user_access_token = "";
    this.withoutLogin = undefined;
    this.navCtrl.navigateRoot(['./loginpage']);
  }
  
}

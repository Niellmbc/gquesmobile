import { Component } from '@angular/core';
import { NavController, Alert,  AlertController,App ,LoadingController} from 'ionic-angular';
import { FinancePage } from '../finance/finance';
import { CashierPage } from '../cashier/cashier';
import { RegistrarPage } from '../registrar/registrar';
import { TransactionListPage } from '../transaction-list/transaction-list';
import {DataProvider} from '../../providers/data/data';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
mytrans = [];
  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public app:App, public loadingCtrl:LoadingController, private ds:DataProvider, private localNotif:LocalNotifications) {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
   this.presentLoadingDefault();
   this.getmyTransaction()
  }


  presentLoadingDefault() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
  logoutme() {
    //this.navCtrl.push(WelcomePage);
    const root = this.app.getRootNav();
    
    const confirm = this.alertCtrl.create({
      title: 'Exit',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            // console.log('Agree clicked');
            root.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }
  newtrans(){
    this.navCtrl.push(FinancePage);
  }
  seeCashiers(){
    this.navCtrl.push(CashierPage);
  }
  seeRegistrar(){
    this.navCtrl.push(RegistrarPage);
  }
  translist(){
    this.navCtrl.push(TransactionListPage);
  }
  getmyTransaction(){
    let studnumber = localStorage.studentNo;
    this.ds.getmyTrans(studnumber).subscribe((res)=>{
      if(res==0){
        this.mytrans = [0];
      }else{
        this.mytrans = res;
      }
      
      console.log(this.mytrans);
    });
  }
  notify(){
    this.localNotif.schedule({
      title:'New message',
      text: 'you are near in line',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null,
      icon: '../../assets/imgs/finallogo.png'
   });
  }

}

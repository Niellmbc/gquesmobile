import { Component } from '@angular/core';
import { NavController, AlertController,App ,LoadingController,ToastController} from 'ionic-angular';
import { FinancePage } from '../finance/finance';
import { CashierPage } from '../cashier/cashier';
import { RegistrarPage } from '../registrar/registrar';
import { TransactionListPage } from '../transaction-list/transaction-list';
import {DataProvider} from '../../providers/data/data';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PusherProvider } from '../../providers/pusher/pusher';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
mytrans = [];
myregtrans =[];
  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public app:App, public loadingCtrl:LoadingController, private ds:DataProvider, private localNotif:LocalNotifications, private pusher:PusherProvider, public toastCtrl:ToastController) {
    let channel: any;
    channel = this.pusher.chooseChannel();
    channel.bind('my-event', x=> {
      console.log(x);
      this.doneTransaction();
      this.getmyTransaction();
      this.getmyRegTransaction();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
   this.presentLoadingDefault();
   this.getmyTransaction();
    this.getmyRegTransaction();
    
  }
  presentLoadingDefault() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
  presentDone() {
    const loader = this.loadingCtrl.create({
      content: "Your Transaction is Done",
      duration: 3000
    });
    loader.present();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
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
      
    });
  }
  getmyRegTransaction(){
    let studnumber = localStorage.studentNo;
    this.ds.getmyregTrans(studnumber).subscribe((res)=>{
      if(res==0){
        this.myregtrans = [0];
      }else{
        this.myregtrans = res;
      }
      console.log(this.myregtrans);
    });
  }
  notify(){
    this.localNotif.schedule({
      title:'GQUES',
      text: 'You are near in line',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null,
      icon: '../../assets/imgs/finallogo.png'
   });
  }
  doneTransaction(){
    this.localNotif.schedule({
      title:'GQUES',
      text: 'Done Transaction',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: '2d2d2d',
      sound: null,
      icon: '../../assets/imgs/finallogo.png'
   });
  }
  leaveline(){
    let studnumber = localStorage.studentNo;
    let data = {
      fldRemarks:"No Show"
    }
    this.ds.updateData(studnumber,'tbl_transaction','fldStudentNo',data).subscribe(res=>{
      const toast = this.toastCtrl.create({
        message: 'You leave the line',
        duration: 3000,
        position:'top'
      });
      toast.present();
    });
    this.ds.send().subscribe(res=>{
    });
  }
  

}

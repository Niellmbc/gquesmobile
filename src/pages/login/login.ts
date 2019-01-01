import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {DataProvider} from '../../providers/data/data';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  vpassword:string;
  vstudnumber:string;
  tblStudent=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private ds:DataProvider, public alertCtrl:AlertController, public loadingCtrl:LoadingController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
  loginAccount(){
    this.ds.getTablewithID('tbl_student','fldStudentNo',this.vstudnumber).subscribe((res)=>{
      if(res==0){
        const alert = this.alertCtrl.create({
          title: 'Invalid!',
          subTitle: 'No Existing Student Number',
          buttons: ['OK']
        });
        alert.present();
      }else{
        if(this.vpassword==res[0].fldPassword){
         
          localStorage.setItem('studentNo',res[0].fldStudentNo);
          this.navCtrl.push(TabsPage);
        }else{
          const alert = this.alertCtrl.create({
            title: 'Invalid!',
            subTitle: 'Please Check your Password',
            buttons: ['OK']
          });
          alert.present();
        }
      }
    });
    
  }
  
}

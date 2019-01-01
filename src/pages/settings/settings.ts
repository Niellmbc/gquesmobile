import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, Alert,App } from 'ionic-angular';

import {DataProvider} from '../../providers/data/data';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
fname:String;
lname:String;
mname:String;
studentnum:string;
vCurrentPass:string;
vNewPass:string;
vConfirmPass:string;
pass:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ds:DataProvider, public alertCtrl:AlertController, public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.getmyData();
  }

  getmyData(){
    let id = localStorage.studentNo;
    this.ds.getTablewithID('tbl_student','fldStudentNo',id).subscribe((res)=>{
      this.fname = res[0].fldFname;
      this.lname= res[0].fldLname;
      this.mname = res[0].fldMname;
      this.studentnum=res[0].fldStudentNo;
      this.pass= res[0].fldPassword;


    });
  }
  updatePass(){
    if(this.vCurrentPass != this.pass){
      const alert = this.alertCtrl.create({
        title: '',
        subTitle: ' Current Password Did Not Match!',
        buttons: ['OK']
      });
      alert.present();
    }else if(this.vNewPass != this.vConfirmPass){
      const alert = this.alertCtrl.create({
        title: '',
        subTitle: 'New Password Dont Match!',
        buttons: ['OK']
      });
      alert.present();
    }else{
      let id = localStorage.studentNo;
      let data={
        fldPassword:this.vConfirmPass
      }
      this.ds.updateData(id,'tbl_student','fldStudentNo',data).subscribe((res)=>{
        const alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Updated Successfully!',
          buttons: ['OK']
        });
        alert.present();
      });
    }
    
  }

}

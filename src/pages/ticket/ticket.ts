import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import { TransactionListPage } from '../transaction-list/transaction-list';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {
lastStudTrans =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, private ds:DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
    this.presentLoadingDefault();
    this.getStudentTrans();
    setTimeout(this.goHome(),5000);
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
  leavingLineLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Leaving Line'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
  getStudentTrans(){
    let studentnum = localStorage.getItem('studentNo');
    this.ds.getStudTrans(studentnum).subscribe((res)=>{
     this.lastStudTrans = res;
     localStorage.setItem('TransNoStud',res[0].fldTransID)
     
    });
  }
  leaveLine(){
    let id = localStorage.getItem('TransNoStud');
    let data ={
      fldRemarks:"Leave Line"
    }
    this.ds.updateData(id,'tbl_transaction','fldTransID',data).subscribe((res)=>{
      this.leavingLineLoad();
      this.navCtrl.push(TransactionListPage);
    });
  }
  goHome(){
    this.navCtrl.push(TabsPage);
  }

}

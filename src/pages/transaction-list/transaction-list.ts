import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
/**
 * Generated class for the TransactionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html',
})
export class TransactionListPage {
allTrans = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, private ds:DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionListPage');
    this.getAllTransStud();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  getAllTransStud(){
    let studID = localStorage.getItem('studentNo');
    this.ds.getStudentAllTrans(studID).subscribe((res)=>{
      this.allTrans = res;
    });
  }


}

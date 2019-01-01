import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
/**
 * Generated class for the InfoEachCashierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info-each-cashier',
  templateUrl: 'info-each-cashier.html',
})
export class InfoEachCashierPage {
indx:number;
queue=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, private ds:DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoEachCashierPage');
    this.indx= parseInt(localStorage.getItem('infoEachCindex'));
    console.log(this.indx);
    this.ds.getQueueInCashier(this.indx).subscribe((res)=>{
      this.queue = res;
    });
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

}

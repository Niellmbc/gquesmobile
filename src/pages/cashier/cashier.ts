import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController} from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import { InfoEachCashierPage } from '../info-each-cashier/info-each-cashier';

/**
 * Generated class for the CashierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cashier',
  templateUrl: 'cashier.html',
})
export class CashierPage {
distinctC=[];
transEachC=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private ds:DataProvider,public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashierPage');
    this.getDistintC();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  getDistintC(){
    this.ds.getDistinctCashier().subscribe((res)=>{
      this.distinctC=res;
    });
  }
  getQinCwithID(id){
    localStorage.setItem('infoEachCindex',id);
    const modal = this.modalCtrl.create(InfoEachCashierPage);
    modal.present();
  }


}

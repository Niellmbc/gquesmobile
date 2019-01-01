import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
tblReg=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private ds:DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
    this.getQueue();
  }
  getQueue(){
    this.ds.getTable('tbl_registrar').subscribe((res)=>{
      this.tblReg = res;
    });
    
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }



}

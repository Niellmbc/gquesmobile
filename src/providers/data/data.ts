import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the DataProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
url = 'http://gordoncollegeccs-ssite.net/raniel/GQUESAPI';
post:String;
  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }
  getLastqueue(){
    return this.http.get(this.url+'/tbl_transaction?ORDERBY=fldTransID DESC').map((res)=>res.json())
  }
  updateData(id,tblname,fld,data){
    this.post = JSON.stringify([data]);
    return this.http.post(this.url+'/update/'+tblname+'/'+fld+'/'+id,this.post).map(res=>res.json())
  }
  addData(data,tblname){
    this.post = JSON.stringify([data]);
    return this.http.post(this.url+'/insert/'+tblname,this.post).map(res=>res.json())
  }
  getTablewithID(tblname,fld,id){
    return this.http.get(this.url+'/'+tblname+'/'+fld+'/'+id).map(res=>res.json())
  }
  getTable(tblname){
    return this.http.get(this.url+'/'+tblname).map(res=>res.json())
  }
  getDistinctCashier(){
    return this.http.get(this.url+'/distinctCashier/tbl_transaction').map(res=>res.json());
  }
  getQueueInCashier(id){
    return this.http.get(this.url+'/tbl_transaction/fldCashierNo/'+id).map((res)=>res.json())
  }
  getOnlineCashiers(){
    return this.http.get(this.url+'/tbl_cashier/fldStatus/Online').map((res)=>res.json());
  }
  getTotalTrans(){
    return this.http.get(this.url+'/countTrans').map((res)=>res.json());
  }
  getNumberofTransofCashier(){
    return this.http.get(this.url+'/tbl_transaction/fldCashierNo/fldCashierNo/trans').map((res)=>res.json());
  }
  getLastQInTransFin(){
    return this.http.get(this.url+'/lastqInTransFin').map((res)=>res.json());
  }
  getLastQinReg(){
    return this.http.get(this.url+'/tbl_registrar?ORDERBY=fldRegID DESC').map((res)=>res.json());
  }
  getLastQueue(){
    return this.http.get(this.url+'/tbl_transaction?ORDERBY=fldTransID DESC').map((res)=>res.json());
  }
  getStudTrans(studentNo){
    return this.http.get(this.url+'/tbl_transaction/fldStudentNo/'+studentNo+'?ORDERBY=fldTransID%20DESC').map((res)=>res.json());
  }
  getStudentAllTrans(studentID){
    return this.http.get(this.url+'/tbl_transaction/fldStudentNo/'+studentID).map((res)=>res.json())
  }
  getmyTrans(studentID){
    return this.http.get(this.url+'/mytrans/'+studentID).map((res)=>res.json())
  }
  getmyregTrans(studentID){
    return this.http.get(this.url+'/myregtrans/'+studentID).map((res)=>res.json())
  }
  getLastCashiersaTrans(){
    return this.http.get(this.url+'/tbl_transaction?ORDERBY=fldTransID%20DESC').map((res)=>res.json())
  }
  send(){
    return this.http.get('http://gordoncollegeccs-ssite.net/raniel/GQUESAPI/pusher.php').map(res=>res.json());
  }


}
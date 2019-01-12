import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import { PusherProvider } from '../../providers/pusher/pusher';
import { TabsPage } from '../tabs/tabs';

/**
* Generated class for the FinancePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
	selector: 'page-finance',
	templateUrl: 'finance.html',
})
export class FinancePage {
	vtransaction:string;
	vunit:string;
	getOnlineC = [];
	totalTransaction:number;
	LeastTransOfCashier:number;
	a=0;
	lastqueueInTransFin:any;
	lastqueueInReg:any
	lastqueue:any;
	lastTimeArrival:any;
	dd:any;
	today:any;
	mm:any;
	yyyy:any;
	dd1:any;
	today1:any;
	mm1:any;
	yyyy1:any;
	hrs:any;
	minss:any;
	minss1:any;
	month =[];
	monthname:any;
	lastcashiersatrans:any;
	constructor(public navCtrl: NavController, public navParams: NavParams, private ds:DataProvider, public alertCtrl:AlertController, private pusher:PusherProvider) {
		let channel: any;
		channel = this.pusher.chooseChannel();
		channel.bind('my-event', x=> {
			console.log(x);
			this.getOnlineCashiers();
			this.getTotalT();
			this.numberofTransOfCashier();
			this.lastQinTransFin();
			this.lastQinReg();
			this.LastQueue();
			this.getLastCashiersaTrans();
		});
	}
	ionViewDidEnter() {
		console.log('ionViewDidLoad FinancePage');
		this.getOnlineCashiers();
		this.getTotalT();
		this.numberofTransOfCashier();
		this.lastQinTransFin();
		this.lastQinReg();
		this.LastQueue();
		this.getLastCashiersaTrans();
		
	}

	getOnlineCashiers(){
		this.ds.getOnlineCashiers().subscribe((res)=>{
			for(var i=0;i<res.length;i++){
				this.getOnlineC[i]=res[i].fldCashierID;
			}
		});
	}
	getTotalT(){
		this.ds.getTotalTrans().subscribe((res)=>{
			this.totalTransaction=res[0].totaltrans;
		});    
	}
	numberofTransOfCashier(){
		this.ds.getNumberofTransofCashier().subscribe((res)=>{
			if(res.length==0){
				this.LeastTransOfCashier=0;
			}else{
				this.LeastTransOfCashier = res[0].fldCashierNo;
			}
			console.log(this.LeastTransOfCashier);
		});
	}
	getLastCashiersaTrans(){
		this.ds.getLastCashiersaTrans().subscribe((res)=>{
			if(res.length==0){
			}else{
				this.lastcashiersatrans = res[0].fldCashierNo;
			}
		});
	}
	checkCashier(){
		if(this.totalTransaction >= 20){
			return this.LeastTransOfCashier;
		}else if(this.totalTransaction==0){
			return this.getOnlineC[0];
		}else if(this.getOnlineC.length==1){
			return this.getOnlineC[0];
		}else{
			for(let i=0;i<this.getOnlineC.length;i++){
				if(this.getOnlineC[i]==this.lastcashiersatrans){
					return this.getOnlineC[i+1];
				}else{
					if(this.getOnlineC[this.getOnlineC.length-1] == this.lastcashiersatrans){
						return this.getOnlineC[0];
					}else if(this.getOnlineC.length <3 ){
						if(this.getOnlineC.length-1<=this.a){
							this.a=0;
							return this.getOnlineC[this.a];
						}else{
							this.a++;
							return this.getOnlineC[this.a];
						}
					}
				}
			}
		}
	}
	lastQinTransFin(){
		this.ds.getLastQInTransFin().subscribe((res)=>{
			// console.log(res);
			if(res.length == 0){
				this.lastqueueInTransFin = 0;
			}else{
				this.lastqueueInTransFin = res[0].fldQueueNo;
			}
		});
	}
	lastQinReg(){
		this.ds.getLastQinReg().subscribe((res)=>{
			console.log(res);
			if(res.length==0){
				this.lastqueueInReg =0;
			}else{
				this.lastqueueInReg = res[0].fldQueueNo;	
			}
		});
	}
	LastQueue(){
		this.ds.getLastQueue().subscribe((res)=>{
			if(res.length==0){
				this.today = new Date();
				this.dd = this.today.getDate();
				this.mm = this.today.getMonth()+1; //January is 0!
				this.yyyy = this.today.getFullYear();
				
				var time = 8 + ":" + 30 +" "+'AM';
				// var t = setTimeout(startTime, 500);
				
				if(this.dd<10) {
					this.dd = '0'+this.dd
				} 
				if(this.mm<10) {
					this.mm = '0'+this.mm
				} 
				this.today = this.mm + '/' + this.dd + '/' + this.yyyy;
				this.lastqueue =0;
				this.lastTimeArrival =time;
			}else{
				this.lastqueue = res[0].fldQueueNo;
				this.lastTimeArrival = res[0].fldArrival;
			}
			
		});
	}
	checkTime(i){
		if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
		return i;
	}
	newTrans(){
		this.lastqueueInTransFin++; 
		this.lastqueueInReg++;
		// console.log(this.getOnlineC.length);
		let goToC = this.checkCashier();
	
		this.month=['January','February','March','April','May','June','July','August','September','October','November','December'];
		this.today1 = new Date();
		this.monthname=this.month[this.today1.getMonth()];
		this.dd1 = this.today1.getDate();
		this.mm1= this.today1.getMonth()+1; //January is 0!
		this.yyyy1= this.today1.getFullYear();
		this.today1= new Date();
		var h = this.today1.getHours();
		var m = this.today1.getMinutes();
		var s = this.today1.getSeconds();
		var aorp = "";
		m = this.checkTime(m);
		s = this.checkTime(s);
		if (h > 12) {
			h = h-12;
			if(h == 0){
				h = 1;
			}
			aorp = "PM"; 
		} else { 
			aorp = "AM"; 
		}
		var time = h + ":" + m + ":" + s + " " + aorp;
		// var t = setTimeout(startTime, 500);
		if(this.dd1<10) {
			this.dd1 = '0'+this.dd1
		} 
		if(this.mm1<10) {
			this.mm1 = '0'+this.mm1
		} 
		this.today1 = this.mm1 + '/' + this.dd1 + '/' + this.yyyy1;
		let t = this.lastTimeArrival.split(" ");
		let tm = t[0].split(":");
		let aorps = t[1];
		this.hrs= tm[0];
		this.minss= tm[1];
		this.minss1 = parseInt(this.minss) + 5;
		if(this.minss >= 60 || this.minss1 >= 60 ){
			this.minss = "00";
			this.minss1 = "00";
			this.hrs++;
		}
		if(this.hrs >= 12){
			this.hrs = parseInt(this.hrs) - 12;
			aorps= "PM";
		}else{
			aorps = "AM";
		}
		//Add 5 mins in transaction for time arrival
		let timearrival=this.hrs+':'+this.checkTime(this.minss1)+" "+aorps;
		let dataTrans = {
			studentID:localStorage.getItem('studentNo'),
			cashierNo:goToC,
			queueNo:this.lastqueueInTransFin,
			office:this.vunit,
			type:this.vtransaction,
			date:this.today1+" "+time,
			day:this.yyyy1+"-"+this.mm1+"-"+this.dd1,
			arrival:timearrival,
			remarks:'In Line'
		}
		let dataReg = {
			studentID:localStorage.getItem('studentNo'),
			queueNo:this.lastqueueInReg,
			office:this.vunit,
			type:this.vtransaction,
			date:this.today1+" "+time,
			day:this.yyyy1+"-"+this.mm1+"-"+this.dd1,
			remarks:'In Line'
		}
		if(this.vunit=='Finance'){
			if(this.getOnlineC.length==0){
				const alert = this.alertCtrl.create({
					title: 'No Available Cashier at the Moment',
					buttons: ['OK']
				});
				alert.present();
			}else{
				this.ds.addData(dataTrans,'tbl_transaction').subscribe((res)=>{
					const alert = this.alertCtrl.create({
						title: 'New Transaction has been made',
						buttons: ['OK']
					});
					this.navCtrl.push(TabsPage);
					alert.present();
					this.ds.send().subscribe(res=>{
						console.log(res);
					});
				});
			}
		}else if(this.vunit=='Registrar'){
			this.ds.addData(dataReg,'tbl_registrar').subscribe((res)=>{
				const alert = this.alertCtrl.create({
					title: 'New Transaction has been made',
					buttons: ['OK']
				});
				this.navCtrl.push(TabsPage);
				alert.present();
				this.ds.send().subscribe(res=>{
					console.log(res);
				});
			});
		}
		
	}
	
}

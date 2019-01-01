import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
/*
Generated class for the PusherProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class PusherProvider {
  url = 'http://gordoncollegeccs-ssite.net/raniel/GQUESAPI/pusher.php';
  constructor(public http: HttpClient) {
    
}
chooseChannel(){
  var pusher = new Pusher('5fb69c9d534cd55d78e7', {
    cluster: 'ap1',
    forceTLS: true
  });

  var channel = pusher.subscribe('my-channel');
  return channel;
}
}


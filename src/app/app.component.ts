import { Component } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Client } from './models/client'
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP05';
  filters:any[] = ["",0] ;
  isUserConnected:boolean = false;
  connectedUser:Client = new Client;
  constructor(private apiService: ApiService) {}

  SendSearchParams($event : any){
    console.log($event);
this.filters = $event;
  }
    UserIsConnected([$isUserConnected, $connectedUser]: [boolean, Client]){
    console.log('1 ');
    console.log($isUserConnected);
    console.log($connectedUser);
    this.isUserConnected = $isUserConnected;
    this.connectedUser = $connectedUser;
    if($isUserConnected){
      this.apiService.GetProducts().subscribe(($result)=>{
        //console.log('test API :');
        //console.log($result);
      });
    
    }
  }
}

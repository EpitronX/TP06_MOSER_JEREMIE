import { Component } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Client } from './models/client'
import { ApiService } from './api.service';
import { AsyncSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP05';
  filters: any[] = ["", 0];
  isUserConnected: boolean = false;
  connectedUser: Client = new Client;
  asyncSubject = new AsyncSubject();
  products!: Product[];

  constructor(private apiService: ApiService) {
  }

  SendSearchParams($event: any) {
    this.filters = $event;
  }
  UserIsConnected([$isUserConnected, $connectedUser]: [boolean, Client]) {
    this.isUserConnected = $isUserConnected;
    this.connectedUser = $connectedUser;
  }
}

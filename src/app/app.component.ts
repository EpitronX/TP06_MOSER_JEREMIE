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

    this.asyncSubject.subscribe(() => {
      this.apiService.GetProductsFiltered(this.filters[0]).subscribe(
        (result) => {
          this.products = result;
          console.log("2 there ??");
          console.log(result);
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    });

  }

  SendSearchParams($event: any) {
    console.log($event);
    console.log("1 there ??");
    this.filters = $event
    this.asyncSubject.next(this.apiService.GetProductsFiltered(this.filters[0]));
  }
  UserIsConnected([$isUserConnected, $connectedUser]: [boolean, Client]) {
    console.log('1 ');
    console.log($isUserConnected);
    console.log($connectedUser);
    this.isUserConnected = $isUserConnected;
    this.connectedUser = $connectedUser;
    if ($isUserConnected) {
      this.apiService.GetProducts().subscribe(($result) => {
        //console.log('test API :');
        //console.log($result);
      });

    }
  }
}

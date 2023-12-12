import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HTTPExchangeService {}
  
//   constructor(private http: HttpClient, private apiService:ApiService) { }

//   getProducts(): Observable<Product[]> {
//     //return this.apiService.getCatalogue();
//     return this.http.get<Product[]>('../assets/products.json');
//     }
// }
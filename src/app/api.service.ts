import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Client } from './models/client';
import { Product } from './product.model';
import { environment } from '../../src/environnements/environnement';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    console.log(data);
    return this.http.post<Client>(
      environment.backendLoginClient,
      data,
      httpOptions
    );
  }

  public GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.backendCatalogue);
  }

  public GetProductsFiltered(productName: string): Observable<Product[]> {
    let request: string;
    if (productName !== "") {
      request = environment.backendCatalogue + '/' + productName;
    } else {
      request = environment.backendCatalogue;
    }
    console.log(request);
    return this.http.get<Product[]>(request);
  }

  //  public GetProductsFiltered(name: string, price: number): Observable<Product[]> {

  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     }),
  //   };

  //   let params = new HttpParams()
  //     .set('name', name)
  //     .set('price', price.toString());

  //   return this.http.get<Product[]>(
  //     environment.backendCatalogue, 
  //     { params: params, headers: httpOptions.headers }
  //   );
  //   }
}

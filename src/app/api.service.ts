import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Utilisateur } from './models/utilisateur';
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

  public GetProductsFiltered(productName: string, price: number): Observable<Product[]> {
    let request: string;
    if (productName !== "" && price !== undefined) {
      request = environment.backendCatalogue + '/' + productName + '/' + price;
    } else {
      request = environment.backendCatalogue;
    }
    console.log(request);
    return this.http.get<Product[]>(request);
  }

  public CreateUser(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(environment.backendCreationUser, user );
  }

}

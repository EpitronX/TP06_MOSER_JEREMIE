import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Utilisateur } from './models/utilisateur';
import { Observable } from 'rxjs';
import { Client } from './models/client';
import { Product } from './product.model';
import { environment } from '../../src/environnements/environnement';
import { tap } from 'rxjs/operators';

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

  // CreateUser(user: Utilisateur): Observable<Utilisateur> {
  //   let newUser = {
  //     nom: user.nom,
  //     prenom: user.prenom,
  //     adresse: user.adresse,
  //     codepostal: user.codepostal,
  //     ville: user.ville,
  //     email: user.email,
  //     sexe: user.sexe,
  //     login: user.login,
  //     password: user.password,
  //     telephone: user.telephone
  //   };

  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   return this.http.post<Utilisateur>(environment.backendCreationUser, newUser, httpOptions);
  // }

  // CreateUser(user: Utilisateur): Observable<Utilisateur> {
  //   const formData = new FormData();
  //   formData.append('nom', user.nom);
  //   formData.append('prenom', user.prenom);
  //   formData.append('adresse', user.adresse);
  //   formData.append('codepostal', user.codepostal);
  //   formData.append('ville', user.ville);
  //   formData.append('email', user.email);
  //   formData.append('sexe', user.sexe);
  //   formData.append('login', user.login);
  //   formData.append('password', user.password);
  //   formData.append('telephone', user.telephone);

  //   console.log('Form Data:', formData);

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'multipart/form-data' 
  //     })
  //   };

  //   return this.http.post<Utilisateur>(environment.backendCreationUser, formData, httpOptions).pipe(
  //     tap((createdUser) => {
  //       console.log('Response from server:', createdUser);
  //     })
  //   );
  // }



  public CreateUser(user: Utilisateur): Observable<Utilisateur> {
    const formData = new FormData();
    formData.append('nom', user.nom);
    formData.append('prenom', user.prenom);
    formData.append('adresse', user.adresse);
    formData.append('codepostal', user.codepostal);
    formData.append('ville', user.ville);
    formData.append('email', user.email);
    formData.append('sexe', user.sexe);
    formData.append('password', user.password);
    formData.append('telephone', user.telephone);
    formData.append('login', user.login);
  
    return new Observable<Utilisateur>(observer => {
      fetch(environment.backendCreationUser, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }




}
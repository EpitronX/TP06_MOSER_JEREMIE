import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { Client } from '../models/client'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() isUserConnected = new EventEmitter<[boolean, Client]>();
  login: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  connectedUser:Client = new Client;
  cnx: boolean = false;
  constructor(private apiService: ApiService) {  }
  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe((c:Client) => {
    console.log(c.nom);
    console.log(c.prenom);
      this.nom = c.nom;
      this.prenom = c.prenom;
      this.cnx = true;
      this.connectedUser.nom = c.nom;
      this.connectedUser.prenom = c.prenom;
      this.isUserConnected.emit([this.cnx, this.connectedUser]);
    });
} 
}

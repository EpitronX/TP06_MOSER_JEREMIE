import { Component } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  prenom: string = '';
  nom: string = '';
  adresse: string = '';
  ville: string = '';
  telephone: string = '';
  email: string = '';
  sexe: string = '';
  password: string = '';
  

  constructor(private apiService: ApiService) {  }
  CreateUser() {
    let newUser: Utilisateur = new Utilisateur();
    newUser.prenom = this.prenom;
    newUser.nom = this.nom;
    newUser.adresse = this.adresse;
    newUser.ville = this.ville;
    newUser.telephone = this.telephone;
    newUser.email = this.email;
    newUser.sexe = this.sexe;
    newUser.password = this.password;

    this.apiService.CreateUser(newUser).subscribe(
      (response) => {
        // Handle the response from the API if needed
      },
      (error) => {
        // Handle any errors that occur during the API call
      }
    );
  }
}

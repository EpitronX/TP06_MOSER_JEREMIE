import { Component } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  codepostal: string = '';
  ville: string = '';
  email: string = '';
  sexe: string = '';
  login: string = '';
  password: string = '';
  telephone: string = '';
  error: string = '';


  constructor(private apiService: ApiService) { }
  CreateUser() {
    let newUser: Utilisateur = new Utilisateur();
    newUser.nom = this.nom;
    newUser.prenom = this.prenom;
    newUser.adresse = this.adresse;
    newUser.codepostal = this.codepostal;
    newUser.ville = this.ville;
    newUser.email = this.email;
    newUser.sexe = this.sexe;
    newUser.login = this.login;
    newUser.password = this.password;
    newUser.telephone = this.telephone;

    console.log("--------------------------");
    console.log(newUser);
    this.error = '';
    this.apiService.CreateUser(newUser).subscribe(
      (response) => {
        // Handle the response from the API if needed
      },
      (error) => {
       ;
        console.log("hhehhehe");
        console.log(error);
        const errorObject = JSON.parse(JSON.stringify(error)); // Parse the JSON string back to an object
        const errorDetails = errorObject.error;
        this.error = JSON.stringify(errorDetails.error).replace(/"/g, '');
        // Handle any errors that occur during the API call
      }
    );
  }
}

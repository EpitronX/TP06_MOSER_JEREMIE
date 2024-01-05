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
  information: string = '';
  loading: boolean = false;


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

    console.log(newUser);
    this.error = '';
    this.information = '';
    this.loading = true;
    this.apiService.CreateUser(newUser).subscribe(
      (response: any) => {
        this.loading = false;
        if (!response.error) {
          //response.status === 200 doesn't work 😭😭😭
          this.resetFormValues();
          this.information = 'The user ' + this.prenom + ' has been correctly created !';
        }
        else {
          this.processError(response, this)
        }
      },
      (error) => {
        this.processError(error, this)
        this.loading = false;
      }
    );
  }

  processError = (error: any, context: any) => {

    if (error instanceof SyntaxError) {
      context.error = 'An error occurred while creating the user 😿 !\n Please check the integrity of the data entered 🔍. The email address entered must not belong to any other account and must be in a valid format 🤓. The chosen login may already be in use 🤷🏾‍♂️.';
    }
    else {
      const errorObject = JSON.parse(JSON.stringify(error));
      const errorDetails = errorObject.error;
      if (JSON.stringify(errorDetails.error) != undefined) {
        context.error = JSON.stringify(errorDetails.error).replace(/"/g, '');
      } else {
        context.error = errorDetails.replace(/"/g, '');
      }
      if (!context.error) {
      context.error = 'An error occurred while creating the user 😿 !\n Please check the integrity of the data entered 🔍. The email address entered must not belong to any other account and must be in a valid format 🤓. The chosen login may already be in use 🤷🏾‍♂️.';
      }
    }
  }

  resetFormValues() {
    this.nom = '';
    this.prenom = '';
    this.adresse = '';
    this.codepostal = '';
    this.ville = '';
    this.email = '';
    this.sexe = '';
    this.login = '';
    this.password = '';
    this.telephone = '';
  }
}

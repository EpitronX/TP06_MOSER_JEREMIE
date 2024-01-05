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
        if (response.status === 200) {
          this.information = 'L\'utilisateur ' + this.prenom + ' a bien été créé !';
        } else {
          this.processError(response, this)
        }
        this.loading = true;
      },
      (error) => {
        this.processError(error, this)
        this.loading = true;
      }
    );
  }

  processError = (error: any, context: any) => {
    const errorObject = JSON.parse(JSON.stringify(error));
    const errorDetails = errorObject.error;
    if (JSON.stringify(errorDetails.error) != undefined) {
      context.error = JSON.stringify(errorDetails.error).replace(/"/g, '');
    } else {
      context.error = errorDetails.replace(/"/g, '');
    }
    if (!context.error) {
      context.error = 'Une erreur est survenue lors de la création de l\'utilisateur ! \nPensez à vérifiez des données entrées.';
    }
  }

}

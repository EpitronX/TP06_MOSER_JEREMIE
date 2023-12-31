import { Component } from '@angular/core';

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
}
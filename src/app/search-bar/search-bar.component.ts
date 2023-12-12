import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input() isUserConnected: boolean = false;
  @Output() searchUpdated = new EventEmitter<any[]>();
  nameSearch: string = "";
  priceSearch: number = 0;
  searchItems: any[2] = [];

  OnSearchUpdate() {
    this.searchItems = [this.nameSearch, this.priceSearch];
    this.searchUpdated.emit(this.searchItems);
  }
}
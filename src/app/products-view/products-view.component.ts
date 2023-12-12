import { Component, Input } from '@angular/core';
import { HTTPExchangeService } from '../httpexchange.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddProduct } from '../actions/product-action'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent {

  @Input() filters: any;
  @Input() isUserConnected: boolean = false;
  products$: Observable<Product[]>;

  //constructor(private httpExchangeService: HTTPExchangeService) { }
  //constructor(private httpExchangeService: HTTPExchangeService, private store: Store) { 
    constructor(private apiService: ApiService, private store: Store) { 

    this.products$ = this.apiService.GetProducts();

  }
  addProduct(product: Product) {
    console.log("#########################");
    console.log(product);
    const copyProduct: Product = { ...product };
    //copyProduct.name = 'FEURRRRRRRRRR';
    console.log(copyProduct);
    console.log(product);
    console.log("#########################");
    this.store.dispatch(new AddProduct(copyProduct));
  }
  
}

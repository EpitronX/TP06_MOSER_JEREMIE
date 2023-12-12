import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {Product} from '../product.model'
import { Observable } from 'rxjs';
import {ProductState} from '../states/product.state'
import {AddProduct, DelProduct} from '../actions/product-action'

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  @Input() isUserConnected: boolean = false;
  @Select(ProductState.getProductList) liste$!: Observable<Product[]>;
  @Select(ProductState.getProductCount) nb$!: Observable<number>;
  @Select(ProductState.getCartPrice) cartPrice$!: Observable<number>;
  constructor(private store: Store) {   }
  ngOnInit() {  }
  delProduct(product: Product): void {
    this.store.dispatch(new DelProduct(product));
  }
}

import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Product } from '../product.model'
import { Observable } from 'rxjs';
import { ProductState } from '../states/product.state'
import { DelProduct, EmptyProduct } from '../actions/product-action'

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

  cartPrice: number = 0;

  constructor(private store: Store) { }
  ngOnInit() {

    this.cartPrice$.subscribe(price => {
      this.cartPrice = price;
    });

  }
  delProduct(product: Product): void {
    this.store.dispatch(new DelProduct(product));
  }

  Pay(): void {
    if (this.cartPrice > 0) {
      this.store.dispatch(new EmptyProduct());
    }
  }
}

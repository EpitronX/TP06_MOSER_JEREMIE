import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HTTPExchangeService } from '../httpexchange.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddProduct } from '../actions/product-action'
import { ApiService } from '../api.service'
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})

export class ProductsViewComponent implements OnChanges {

  @Input() filters: any;
  @Input() isUserConnected: boolean = false;
  products$: Observable<Product[]>;
  asyncSubject = new BehaviorSubject<void>(undefined);

  constructor(private apiService: ApiService, private store: Store) {
    this.asyncSubject.next();
    this.products$ = this.asyncSubject.pipe(
      debounceTime(50),
      //distinctUntilChanged(),
      switchMap(() => this.apiService.GetProductsFiltered(this.filters[0], this.filters[1]))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters) {
      this.asyncSubject.next();
    }
  }

  addProduct(product: Product) {
    const copyProduct: Product = { ...product };
    this.store.dispatch(new AddProduct(copyProduct));
  }
}

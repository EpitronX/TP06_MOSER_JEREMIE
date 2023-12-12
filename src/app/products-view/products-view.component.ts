import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HTTPExchangeService } from '../httpexchange.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddProduct } from '../actions/product-action'
import { ApiService } from '../api.service'
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnChanges {

  @Input() filters: any;
  @Input() isUserConnected: boolean = false;
  products$!: Observable<Product[]>;
  behaviorSubject = new BehaviorSubject<Product[]>([]);

  //constructor(private httpExchangeService: HTTPExchangeService) { }
  //constructor(private httpExchangeService: HTTPExchangeService, private store: Store) { 
  constructor(private apiService: ApiService, private store: Store) {
    this.LoadFullCatalogue();
  }

  LoadFullCatalogue(): void {
    this.products$ = this.apiService.GetProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters) {
      // The value of myInputProperty has changed
      const currentValue = changes.filters.currentValue;
      const previousValue = changes.filters.previousValue;
      this.behaviorSubject.subscribe(() => {
        this.apiService.GetProductsFiltered(this.filters[0]).subscribe(
          (result) => {
            //this.products = result;
            console.log("1 there ??");
            console.log(result);
            this.behaviorSubject.next(result);
            // this.products$ = result;
          }
        );
      });
      console.log('myInputProperty changed. New value:', currentValue, 'Previous value:', previousValue);

      if () {

      }

    }
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

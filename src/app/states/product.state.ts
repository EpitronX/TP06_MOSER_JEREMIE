import {Product} from '../product.model';
import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { ProductStateModel } from './product-state-model';
import { AddProduct, DelProduct, EmptyProduct } from '../actions/product-action';

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductState {
  idCart : number = 1;

  @Selector()
  static getProductCount(state: ProductStateModel) {
    console.log("1: ");
    console.log(state.products);
    return state.products.length;
  }
  
  @Selector()
  static getCartPrice(state: ProductStateModel) {
    let totalprice :number = 0;
    state.products.forEach(product => {
    totalprice += Number(product.price)
    });
    return totalprice.toFixed(2);
  }

  @Selector()
  static getProductList(state: ProductStateModel) {
    console.log("2: ");
    console.log(state.products);
    return state.products;
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProductStateModel>,
    { productToAdd }: AddProduct
  ) {
    const state = getState();
    let local_number :number = this.idCart++;
    productToAdd.idCart = local_number;
    console.log("3: ");
    console.log(state.products);
    console.log("4: ");
    console.log(productToAdd);
    console.log("5: ");
    patchState({
      products: [...state.products, productToAdd],
    });
  }

  @Action(DelProduct)
  del(
    { getState, patchState }: StateContext<ProductStateModel>,
    { productToRemove }: DelProduct
  ) {
    const state = getState();
    patchState({
      products: state.products.filter(
        (x) => !(productToRemove.idCart == x.idCart && productToRemove.id == x.id)
      ),
    });
  }

  @Action(EmptyProduct)
  emptyCart(ctx: StateContext<any>, action: EmptyProduct) {
    const state = ctx.getState();
    ctx.setState({ ...state, products: [] });
    window.alert("The cart's been emptied !");
  }
}
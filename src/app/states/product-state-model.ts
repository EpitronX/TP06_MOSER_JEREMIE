import { Product } from '../product.model';
import { State } from '@ngxs/store';

export class ProductStateModel {
  products: Product[] = [new Product];
}

// @State<ProductStateModel>({
//   name: 'products',
//   defaults: {
//     products: [],
//   },
// })
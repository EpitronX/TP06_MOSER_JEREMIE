import {Product} from '../product.model'

export class AddProduct {
    static readonly type = '[Product] Add';
    constructor(public productToAdd: Product) {}
  }
  
  export class DelProduct {
    static readonly type = '[Product] Del';
    constructor(public productToRemove: Product) {}
  }

  export class EmptyProduct {
    static readonly type = '[Product] Empty';
  }
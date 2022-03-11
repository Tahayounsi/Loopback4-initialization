import {Entity, hasMany, model, property} from '@loopback/repository';
import {Product} from './product.model';

@model({settings: {strict: false}})
export class Order extends Entity {
  @property({
    type: 'string',
  })
  orderid?: string;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'string',
  })
  userid?: string;

  @property({
    type: 'string',
  })
  fullname?: string;

  @property({
    type: 'number',
  })
  total?: number;

  @hasMany(() => Product, {keyTo: 'items'})
  products: Product[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;

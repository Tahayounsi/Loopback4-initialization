import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Shoppingcart extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Shoppingcart>) {
    super(data);
  }
}

export interface ShoppingcartRelations {
  // describe navigational properties here
}

export type ShoppingcartWithRelations = Shoppingcart & ShoppingcartRelations;

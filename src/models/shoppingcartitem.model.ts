import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Shoppingcartitem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Shoppingcartitem>) {
    super(data);
  }
}

export interface ShoppingcartitemRelations {
  // describe navigational properties here
}

export type ShoppingcartitemWithRelations = Shoppingcartitem & ShoppingcartitemRelations;

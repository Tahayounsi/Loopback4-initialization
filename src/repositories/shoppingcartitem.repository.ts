import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbtodoDataSource} from '../datasources';
import {Shoppingcartitem, ShoppingcartitemRelations} from '../models';

export class ShoppingcartitemRepository extends DefaultCrudRepository<
  Shoppingcartitem,
  typeof Shoppingcartitem.prototype.id,
  ShoppingcartitemRelations
> {
  constructor(
    @inject('datasources.Dbtodo') dataSource: DbtodoDataSource,
  ) {
    super(Shoppingcartitem, dataSource);
  }
}

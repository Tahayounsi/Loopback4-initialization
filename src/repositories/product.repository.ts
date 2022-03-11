import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbtodoDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.productid,
  ProductRelations
> {
  constructor(
    @inject('datasources.Dbtodo') dataSource: DbtodoDataSource,
  ) {
    super(Product, dataSource);
  }
}

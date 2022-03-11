import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbtodoDataSource} from '../datasources';
import {Order, OrderRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.orderid,
  OrderRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.Dbtodo') dataSource: DbtodoDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Order, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}

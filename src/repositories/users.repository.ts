import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbtodoDataSource} from '../datasources';
import {Users, UsersRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly order: HasManyRepositoryFactory<Order, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.Dbtodo') dataSource: DbtodoDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Users, dataSource);
    this.order = this.createHasManyRepositoryFactoryFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}

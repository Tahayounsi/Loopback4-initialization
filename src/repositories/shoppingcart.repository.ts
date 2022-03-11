import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbtodoDataSource} from '../datasources';
import {Shoppingcart, ShoppingcartRelations, Users, Product} from '../models';
import {UsersRepository} from './users.repository';
import {ProductRepository} from './product.repository';

export class ShoppingcartRepository extends DefaultCrudRepository<
  Shoppingcart,
  typeof Shoppingcart.prototype.id,
  ShoppingcartRelations
> {

  public readonly user: HasOneRepositoryFactory<Users, typeof Shoppingcart.prototype.id>;

  public readonly uuu: BelongsToAccessor<Users, typeof Shoppingcart.prototype.id>;

  public readonly products: HasManyRepositoryFactory<Product, typeof Shoppingcart.prototype.id>;

  constructor(
    @inject('datasources.Dbtodo') dataSource: DbtodoDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Shoppingcart, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.uuu = this.createBelongsToAccessorFor('uuu', usersRepositoryGetter,);
    this.registerInclusionResolver('uuu', this.uuu.inclusionResolver);
    this.user = this.createHasOneRepositoryFactoryFor('user', usersRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}

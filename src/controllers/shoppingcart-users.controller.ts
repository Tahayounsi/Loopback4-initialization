import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Shoppingcart,
  Users,
} from '../models';
import {ShoppingcartRepository} from '../repositories';

export class ShoppingcartUsersController {
  constructor(
    @repository(ShoppingcartRepository)
    public shoppingcartRepository: ShoppingcartRepository,
  ) { }

  @get('/shoppingcarts/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Shoppingcart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof Shoppingcart.prototype.id,
  ): Promise<Users> {
    return this.shoppingcartRepository.uuu(id);
  }
}

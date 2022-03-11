import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Shoppingcart,
  Product,
} from '../models';
import {ShoppingcartRepository} from '../repositories';

export class ShoppingcartProductController {
  constructor(
    @repository(ShoppingcartRepository) protected shoppingcartRepository: ShoppingcartRepository,
  ) { }

  @get('/shoppingcarts/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Shoppingcart has many Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.shoppingcartRepository.products(id).find(filter);
  }

  @post('/shoppingcarts/{id}/products', {
    responses: {
      '200': {
        description: 'Shoppingcart model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Shoppingcart.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInShoppingcart',
            exclude: ['productid'],
            optional: ['shoppingcartid']
          }),
        },
      },
    }) product: Omit<Product, 'productid'>,
  ): Promise<Product> {
    return this.shoppingcartRepository.products(id).create(product);
  }

  @patch('/shoppingcarts/{id}/products', {
    responses: {
      '200': {
        description: 'Shoppingcart.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.shoppingcartRepository.products(id).patch(product, where);
  }

  @del('/shoppingcarts/{id}/products', {
    responses: {
      '200': {
        description: 'Shoppingcart.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.shoppingcartRepository.products(id).delete(where);
  }
}

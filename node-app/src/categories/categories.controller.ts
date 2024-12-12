import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from '@nestjs/common';
import { ApiTags, ApiParam, ApiQuery, ApiResponse, ApiOperation, getSchemaPath  } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { Meta } from '../meta/meta.entity'
import { Product } from '../products/products.entity'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page' })
  @ApiQuery({ name: 'page', required: false, description: 'The page number to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'A list of categories',
    type: [Meta],
    example: {
      items: {
        "id": 0,
        "name": "string",
        "description": "string",
        "image": "string",
        "created_at": "2024-12-11T19:21:58.991Z",
        "updated_at": "2024-12-11T19:21:58.991Z"
      },
      meta: {
        "totalItems": 0,
        "itemCount": 0,
        "itemsPerPage": 10,
        "totalPages": 0,
        "currentPage": 1
      }
    }
    // schema: {
    //   type: 'object',
    //   properties: {
    //     items: {$ref: getSchemaPath(Category)},
    //     meta: {$ref: getSchemaPath(Meta)}
    //   }
    // }
  })
  @ApiResponse({ status: 404, description: 'No categories found' })
  index(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Pagination<Category>> {
    return this.categoriesService.paginate({ limit, page });
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The created category' })
  @ApiResponse({
      status: 200,
      description: 'A list of products in the category',
      type: [Category],
      example: {
        "id": 0,
        "name": "string",
        "description": "string",
        "image": "string",
        "created_at": "2024-12-11T18:23:25.390Z",
        "updated_at": "2024-12-11T18:23:25.390Z"
      }
    })
  store(@Body() categoryData: Category): Promise<Category> {
    return this.categoriesService.create(categoryData);
  }

  @Get(':categoryId/products')
  @ApiOperation({ summary: 'Get all products for a specific category' })
  @ApiParam({ name: 'categoryId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'A list of products',
    type: [Product],
    example: [
      {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "image": "string",
        "category_id": 0,
        "created_at": "2024-12-11T21:36:51.052Z",
        "updated_at": "2024-12-11T21:36:51.052Z"
      },
    ],
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  getProductsByCategory(@Param('categoryId') categoryId: number): Promise<Product[]> {
    return this.categoriesService.findProductsByCategory(categoryId);
  }


  @Get(':categoryId')
  @ApiOperation({ summary: 'Get a specific category' })
  @ApiParam({ name: 'categoryId'})
  @ApiResponse({ status: 200, description: 'A specific category',
    type: [Category], 
    example: {
      "id": 0,
      "name": "string",
      "description": "string",
      "image": "string",
      "created_at": "2024-12-11T20:34:15.597Z",
      "updated_at": "2024-12-11T20:34:15.597Z"
    }
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  show(@Param('categoryId') id: number): Promise<Category | null> {
    return this.categoriesService.findOne(id);
  }

  @Put(':categoryId')
  @ApiOperation({ summary: 'Update a specific category' })
  @ApiParam({ name: 'categoryId' })
  @ApiResponse({ status: 200, description: 'The updated category', 
    type: [Category],
    example: {
      "id": 0,
      "name": "string",
      "description": "string",
      "image": "string",
      "created_at": "2024-12-11T20:34:58.270Z",
      "updated_at": "2024-12-11T20:34:58.270Z"
    }
  })
  update(@Param('categoryId') id: number, @Body() categoryData: Category): Promise<Category> {
    return this.categoriesService.update(id, categoryData);
  }

  @Delete(':categoryId')
  @ApiOperation({ summary: 'Delete a specific category' })
  @ApiParam({ name: 'categoryId' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  delete(@Param('categoryId') id: number): void {
    const deleted = this.categoriesService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }
}

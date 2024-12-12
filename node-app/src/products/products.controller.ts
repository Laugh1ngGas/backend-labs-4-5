import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from '@nestjs/common';
  import { ApiTags, ApiParam, ApiQuery, ApiResponse, ApiOperation } from '@nestjs/swagger';
  import { Pagination } from 'nestjs-typeorm-paginate';
  import { Product } from './products.entity';
  import { ProductsService } from './products.service';
  import { Meta } from '../meta/meta.entity';
  
  @ApiTags('Products')
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Get('')
    @ApiOperation({ summary: 'Get all products' })
    @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page' })
    @ApiQuery({ name: 'page', required: false, description: 'The page number to retrieve' })
    @ApiResponse({ status: 200, description: 'A list of products',
      type: [Meta],
      example: {
        items: {
          "id": 0,
          "name": "string",
          "description": "string",
          "price": 0,
          "image": "string",
          "category_id": 0,
          "created_at": "2024-12-11T20:35:44.074Z",
          "updated_at": "2024-12-11T20:35:44.074Z"
        },
        meta: {
          "totalItems": 0,
          "itemCount": 0,
          "itemsPerPage": 10,
          "totalPages": 0,
          "currentPage": 1
        }
      }
     })
    @ApiResponse({ status: 404, description: 'No products found' })
    index(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Pagination<Product>> {
      return this.productsService.paginate({ limit, page });
    }
  
    @Post('')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'The created product', 
        type: [Product],
        example: {
          "id": 0,
          "name": "string",
          "description": "string",
          "price": 0,
          "image": "string",
          "category_id": 0,
          "created_at": "2024-12-11T18:24:22.000Z",
          "updated_at": "2024-12-11T18:24:22.000Z"
        }
    })
    store(@Body() productData: Product): Promise<Product> {
      return this.productsService.create(productData);
    }
    
    @Get(':productId')
    @ApiOperation({ summary: 'Get a specific product' })
    @ApiParam({ name: 'productId' })
    @ApiResponse({ status: 200, description: 'A specific product',
      type: [Product],
      example: {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "image": "string",
        "category_id": 0,
        "created_at": "2024-12-11T18:24:22.000Z",
        "updated_at": "2024-12-11T18:24:22.000Z"
      }
     })
    @ApiResponse({ status: 404, description: 'Product not found' })
    show(@Param('productId') id: number): Promise<Product | null> {
      return this.productsService.findOne(id);
    }
  
    @Put(':productId')
    @ApiOperation({ summary: 'Update a specific product' })
    @ApiParam({ name: 'productId' })
    @ApiResponse({ status: 200, description: 'The updated product',
      type: [Product],
      example: {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "image": "string",
        "category_id": 0,
        "created_at": "2024-12-11T18:24:22.000Z",
        "updated_at": "2024-12-11T18:24:22.000Z"
      }
     })
    update(@Param('productId') id: number, @Body() productData: Product): Promise<Product> {
      return this.productsService.update(id, productData);
    }
  
    @Delete(':productId')
    @ApiOperation({ summary: 'Delete a specific product' })
    @ApiParam({ name: 'productId' })
    @ApiResponse({ status: 204, description: 'Product deleted successfully' })
    delete(@Param('productId') id: number): void {
      const deleted = this.productsService.remove(id);
      if (!deleted) {
        throw new NotFoundException(`Product #${id} not found`);
      }
    }

    
  }
  
import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {DeleteResult, Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import { Product } from '../products/products.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>,
    ) {}

    public create(categoryData: Category): Promise<Category> {
        return this.repository.save(categoryData);
    }

    public findAll(): Promise<Category[]> {
        return this.repository.find();
    }

    public async findProductsByCategory(categoryId: number): Promise<Product[]> {
        const category = await this.repository.findOne({
          where: { id: categoryId },
          relations: ['product'],
        });
      
        if (!category) {
          throw new NotFoundException(`Category with Id #${categoryId} not found`);
        }
      
        return category.product;
      }

    public findOne(id: number): Promise<Category | null> {
        return this.repository.findOneBy({ id });
    }

    public async update(id: number, updateData: Partial<Category>): Promise<Category> {
        const product = await this.repository.findOneBy({ id });
    
        if (!product) {
          throw new NotFoundException(`Product with ID #${id} not found`);
        }
    
        const updatedProduct = Object.assign(product, updateData);
        return this.repository.save(updatedProduct);
    }

    public  remove(id: number): Promise<DeleteResult>{
        return this.repository.delete(id);
    }
    public paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
        return paginate<Category>(this.repository, options);
    }
}

import { Injectable, NotFoundException  } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./products.entity";
import {DeleteResult, Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private repository: Repository<Product>,
    ) {}

    public create(productsData: Product): Promise<Product> {
        return this.repository.save(productsData);
    }

    public findAll(): Promise<Product[]> {
        return this.repository.find();
    }

    public findOne(id: number): Promise<Product | null> {
        return this.repository.findOneBy({ id });
    }

    public async update(id: number, updateData: Partial<Product>): Promise<Product> {
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
    public paginate(options: IPaginationOptions): Promise<Pagination<Product>> {
        return paginate<Product>(this.repository, options);
    }
}

import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Category } from '../categories/category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', description: '\nUnique identifier for the product', readOnly: true })
    id: number;
    @Column()
    @ApiProperty({ type: String, description: '\nName of the product' })
    name: string;
    @Column()
    @ApiProperty({ type: String, description: '\nDescription of the product' })
    description: string;
    @Column()
    @ApiProperty({ type: Number, format: 'float', description: '\nPrice of the product' })
    price: number;
    @Column()
    @ApiProperty({ type: String, format: 'uri', description: '\nURL to the image for the product' })
    image: string;
    @ManyToOne(() => Category, category => category.product)
    @ApiProperty({ type: 'integer', description: '\nThe ID of the category this product belongs to' })
    category: Category;
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    @ApiProperty({ type: String, format: 'date-time', description: '\nDate and time the product was created', readOnly: true })
    public created_at: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @ApiProperty({ type: String, format: 'date-time', description: '\nDate and time the product was last updated', readOnly: true })
    public updated_at: Date;
}

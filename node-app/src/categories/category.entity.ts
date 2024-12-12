import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Product } from '../products/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', description: '\nUnique identifier for the category', readOnly: true })
    id: number;
    @Column()
    @ApiProperty({ type: String, description: '\nName of the category' })
    name: string;
    @Column()
    @ApiProperty({ type: String, description: '\nDescription of the category' })
    description: string;
    @Column()
    @ApiProperty({ type: String, format: 'uri', description: '\nURL to the image for the category' })
    image: string;
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    @ApiProperty({ type: String, format: 'date-time', description: '\nDate and time the category was created', readOnly: true })
    public created_at: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @ApiProperty({ type: String, format: 'date-time', description: '\nDate and time the category was last updated', readOnly: true })
    public updated_at: Date;
    @OneToMany(() => Product, product => product.category)
    product: Product[];
}
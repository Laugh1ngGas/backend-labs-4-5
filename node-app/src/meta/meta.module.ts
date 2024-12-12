import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Meta} from "./meta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Meta])],
  controllers: [MetaController],
  providers: [MetaService]
})
export class MetaModule {}

import { ApiProperty } from '@nestjs/swagger';

export class Meta {
    @ApiProperty({ type: 'integer', example: "0", description: '\nTotal number of items available' })
    totalItems: number;
  
    @ApiProperty({ type: 'integer', example: "0", description: '\nNumber of items on the current page' })
    itemCount: number;
  
    @ApiProperty({ type: 'integer', example: "10", description: '\nNumber of items per page' })
    itemsPerPage: number;
  
    @ApiProperty({ type: 'integer', example: "0", description: '\nTotal number of pages available' })
    totalPages: number;
  
    @ApiProperty({ type: 'integer', example: "1", description: '\nCurrent page number' })
    currentPage: number;
  }
  
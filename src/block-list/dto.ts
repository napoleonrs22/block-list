import { ApiProperty } from '@nestjs/swagger';
// import { BlockItemType } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';
import { BlockItemType } from 'generated/prisma/client';
// import { BlockItemType } from 'generated/prisma';

export class BlockItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  blockListId: number;

  @ApiProperty({
    enum: BlockItemType,
  })
  type: BlockItemType;

  @ApiProperty()
  data: string;

  @ApiProperty()
  createdAt: Date;
}

export class BlockListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({
    type: [BlockItemDto],
  })
  items: BlockItemDto[];
}

export class BlockListQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;
}

export class AddBlockItemDto {
  @ApiProperty({
    enum: BlockItemType,
  })
  @IsIn(Object.values(BlockItemType)) // проверка, что значение входит в enum
  type: BlockItemType;

  @ApiProperty()
  data: string;
}

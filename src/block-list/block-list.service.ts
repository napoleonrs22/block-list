import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddBlockItemDto, BlockListQueryDto } from './dto';

@Injectable()
export class BlockListService {
  constructor(private db: DbService) {}

  create(userId: number) {
    return this.db.blockList.create({
      data: { ownerId: userId },
    });
  }

  getByUser(userId: number, query: BlockListQueryDto) {
    return this.db.blockList.findFirstOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: query.q
            ? { data: { contains: query.q, mode: 'insensitive' } }
            : undefined,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async addItem(userId: number, data: AddBlockItemDto) {
    const blockList = await this.db.blockList.findFirstOrThrow({
      where: { ownerId: userId },
    });

    return this.db.blockItem.create({
      data: { blockListId: blockList.id, ...data },
    });
  }

  async removeItem(userId: number, itemId: number) {
    const blockList = await this.db.blockList.findFirstOrThrow({
      where: { ownerId: userId },
    });

    return this.db.blockItem.delete({
      where: { id: itemId },
    });
  }
}

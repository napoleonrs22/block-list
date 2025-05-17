import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { BlockListService } from 'src/block-list/block-list.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
    constructor(
        private db: DbService,
        private accountService:AccountService,
        private blocklistService:BlockListService
    ){}
    
    async finByEmail(email:string){
        return this.db.user.findFirst({
            where:{
                email
            }
        })
    }

    async create(email:string,hash:string,salt:string){
        const user = await this.db.user.create({
            data:{
                email,hash,salt
            }
        })
        await this.blocklistService.create(user.id);
        await this.accountService.create(user.id);
        return user;
    }
}

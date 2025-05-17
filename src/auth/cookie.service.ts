import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
    static  tokenkey = 'accesss-token'
    
    setToken(res:Response,token:string){
        res.cookie(CookieService.tokenkey,token,{
            httpOnly:true,
            maxAge:25 *60 *60 *1000
        });
    }

    removeToken(res:Response){
        res.clearCookie(CookieService.tokenkey);
    }
}

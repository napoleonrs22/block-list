import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import e from 'express';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private passwordServie:PasswordService,
        private jwtService:JwtService
    ){}

    async signUp(email:string,password:string){
        const user = await this.userService.finByEmail(email);
        
        if(user){
            throw new  BadRequestException({type: 'email'})
        }
        const salt = this.passwordServie.getSalt();
        const hash = this.passwordServie.getHash(password,salt);
        const newUSer = await this.userService.create(email,hash,salt);
        
        const accessToken = await this.jwtService.signAsync({
            id: newUSer.id,
            email: newUSer.email,
        });
        return  {accessToken};
    }

    async signIn(email:string,password:string){
        const user = await this.userService.finByEmail(email);
        console.log("User hash:", user);

        if(!user){
            throw new  UnauthorizedException()
        }
        const hash = this.passwordServie.getHash(password,user.salt);
        
        if (hash !== user.hash){
            throw new UnauthorizedException();
        }
    
        
        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
        });
        return  {accessToken};
    }
}

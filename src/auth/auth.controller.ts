import { Controller, HttpCode, HttpStatus, Post,Get, Body, Res, UseGuards } from '@nestjs/common';
import {GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';
@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService,
        private cookieServicc:CookieService,
    ){

    }

    @Post('sign-up')
    @ApiCreatedResponse()
    async signUp(@Body() body: SignUpBodyDto,@Res({passthrough:true}) res:Response){
        const {accessToken} = await  this.authService.signUp(
            body.email, 
            body.password
        );
        this.cookieServicc.setToken(res,accessToken);
    }
    @Post('sign-in')
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body() body:SignInBodyDto,
        @Res({passthrough:true}) res: Response
    ){
        const {accessToken} = await  this.authService.signIn(
            body.email, 
            body.password
        );
        this.cookieServicc.setToken(res,accessToken);
    }
    @Post('sign-out')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    @UseGuards(AuthGuard)
    signOut(
        @Res({passthrough:true}) res:Response
    ){
        this.cookieServicc.removeToken(res);
    }
    @Get('session')
    @ApiOkResponse({
        type:GetSessionInfoDto,
    })
    @UseGuards(AuthGuard)
    getSessionInfo(@SessionInfo() session:GetSessionInfoDto){
        return session;
    }
}

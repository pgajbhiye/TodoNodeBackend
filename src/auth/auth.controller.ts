import {Body, Controller, Injectable, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth.credentials.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./getuser.decorater";
import {UserEntity} from "./user.entity";

@Controller('auth')
export class AuthController {

    constructor(private service: AuthService){

    }

    @Post('/signup')
    public signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.service.signup(authCredentialsDto);
    }

    @Post('/signin')
    public signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.service.signin(authCredentialsDto);
    }

}

import {PassportStrategy} from "@nestjs/passport";
import {Strategy,ExtractJwt} from 'passport-jwt'
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayload} from "./jwt.payload";
import {UserRepository} from "../user.repository";
import {UserEntity} from "../user.entity";
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.PROD_JWTSECRET || config.get('jwt.secret')
        });
    }

    //this method is only called if the payload is valid
    async validate(payload: JwtPayload) : Promise<UserEntity> {
        const {username} = payload;
          const user =  await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}




import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {AuthCredentialsDto} from "./dto/auth.credentials.dto";
import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{


    public signup = async (authcredentialsDto : AuthCredentialsDto)=> {
        const {username, password} = authcredentialsDto;

        //Using salt,we can avoid storing plain text passwords - security risk
        //It is a one way hash, and we do not save the actual user passwords, we save only hash of password
        const salt = await bcrypt.genSalt();

        const user = new UserEntity();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);
        try{
            await user.save();
        } catch (e) {
            if(e.code === "23505"){
                throw new ConflictException("User already exists ");
            }
            throw new InternalServerErrorException()
        }
   };

    public signIn =  async (authcredentialsDto : AuthCredentialsDto): Promise<string>=> {
        const {username, password} = authcredentialsDto;
        const user = await this.findOne({username});

        if(user) {
            const isPassowordValid = await user.validatePassword(password);
            if(isPassowordValid){
                return user.username;
            }
            throw new UnauthorizedException("Invalid credentials");
        }
        throw new NotFoundException("User does not exist. Please sign up");
    };

   private hashPassword(password: string, salt: string) : Promise<string>{
     return bcrypt.hash(password, salt)
   }
}

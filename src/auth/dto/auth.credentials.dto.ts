import {IsString, Matches, MaxLength, MinLength} from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(25)
    public username : string;


    @MinLength(6)
    @MaxLength(12)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Password should have atleast one upper case letter, lower case letter, (atleast a digit or atleast one special character)"
    })
    public password : string;


}

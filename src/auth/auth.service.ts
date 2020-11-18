import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialsDto);
  }

  public async signin(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.signIn(authCredentialsDto);
    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
    // return userName;
  }
}

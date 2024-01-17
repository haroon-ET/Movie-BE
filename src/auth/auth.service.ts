import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthSignupDto } from './dto/signup-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { encodePassword, comparePassword } from './bcrypt';
import { AuthSigninDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signup(signupDto: AuthSignupDto) {
    const email = signupDto.email;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const password = encodePassword(signupDto.password);
    const newUser = this.userRepository.create({ ...signupDto, password });
    await this.userRepository.save(newUser);

    return newUser;
  }

  async signin({ email, password }: AuthSigninDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await comparePassword(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtUser(user.id, user.email);
    return { token };
  }

  jwtUser(userId: number, email: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
    });
  }
}

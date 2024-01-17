import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './auth.service';
import { AuthSignupDto } from './dto/signup-user.dto';
import { AuthSigninDto } from './dto/signin-user.dto';

@Controller('/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signupUser(@Body() signupDto: AuthSignupDto) {
    return this.userService.signup(signupDto);
  }

  @Post('/signin')
  signinUser(@Body() signinDto: AuthSigninDto) {
    return this.userService.signin(signinDto);
  }
}

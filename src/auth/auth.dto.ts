import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class TokenDto {
  token: string;
}

export class AuthUserDto {
  sub: string;
  username: string;
}

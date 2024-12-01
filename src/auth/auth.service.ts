import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { TokenDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getUserByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username });
  }

  async createUser(user: User): Promise<boolean> {
    const newUser = new this.userModel(user);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();

    return true;
  }

  async signIn(username: string, password: string): Promise<TokenDto> {
    const user = await this.getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id.toString(), username: user.username };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}

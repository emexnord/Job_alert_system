import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.schema';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User) {
    const payload = {
      email: user?.email,
      _id: user?._id,
      image: user?.image,
      name: user?.name,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  async authenticateWithGoogle(profile: any): Promise<string> {
    const payload = {
      email: profile.emails[0].value,
      image: profile.photos[0].value,
      name: profile.displayName,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { jwtModule } from '../jwt/jwt.module';
import { GoogleStrategy } from '../../strategies/google.strategy';
import { JwtMiddleware } from '../jwt/jwt.middleware';
import { JwtStrategy } from '../../strategies/jwt.strategy';

@Module({
  imports: [
    jwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, GoogleStrategy, JwtStrategy],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        '/user/login',
        '/user/register',
        '/user/forgot-password',
        '/user/reset-password',
        '/user/auth/google',
        '/user/auth/google/callback',
      )
      .forRoutes('/user');
  }
}

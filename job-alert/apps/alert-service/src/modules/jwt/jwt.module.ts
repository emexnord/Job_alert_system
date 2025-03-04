import { Module, NestModule } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: 604800 },
    }),
  ],
  providers: [JwtAuthService, JwtService],
  exports: [JwtAuthService],
})
export class jwtModule implements NestModule {
  configure() {}
}

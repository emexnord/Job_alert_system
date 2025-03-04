import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { pbkdf2Sync } from 'crypto';
import { Express } from 'express';
import { JwtAuthService } from '../jwt/jwt.service';
import { GoogleOauthGuard } from './decorators/GoogleOauth.guard';
import { GetUser } from './decorators/user.decorator';

import { User, UserDocument } from './models/user.schema';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private jwtNestService: JwtService,
    private readonly userService: UserService,
    private jwtService: JwtAuthService,
  ) {}

  @Get('/auth/google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('/auth/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Query('token') token: string, @Res() res) {
    console.log('token', token);
    if (!token) return res.redirect(process.env.ORIGIN);

    try {
      const user = await this.userService.verifyGoogleToken(token);
      const accessToken = await this.jwtService.login(user);
      res.json({ user, token: accessToken });
    } catch (error) {
      throw new HttpException('Invalid user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    const user = await this.userService.create({ email, password, name });
    const token = await this.jwtService.login(user);
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hash = pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString(
      'hex',
    );

    if (hash !== user.password) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.jwtService.login(user);
    return { user, token };
  }

  // @Post('forgot-password')
  // async recoverPassword(@Body('email') email: string) {
  //   return this.userService.recoverPassword(email);
  // }

  // @Post('reset-password')
  // async resetPassword(
  //   // @GetUser() user: User,
  //   @Body('resetId') resetId: string,
  //   @Body('newPassword') newPassword: string,
  // ) {
  //   return this.userService.resetPassword({ resetId, newPassword });
  // }

  @Put()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    try {
      return await this.userService.update(user._id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('picture')
  @UseInterceptors(FileInterceptor('picture'))
  async updateUserPicture(
    // @UploadedFile() picture: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<User> {
    try {
      // const { url } = await this.s3Service.uploadFile(
      //   picture,
      //   `users/${user._id}/profile-picture`,
      // );
      return await this.userService.updatePicture(user._id, 'url');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('detail')
  async getUser(@GetUser() user: User): Promise<UserDocument> {
    return this.userService.findById(user._id);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Delete()
  async deleteById(@GetUser() user: User): Promise<void> {
    await this.userService.delete(user._id);
  }
}

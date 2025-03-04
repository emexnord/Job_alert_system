import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OAuth2Client } from 'google-auth-library';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './models/user.schema';
import { pbkdf2Sync, randomBytes } from 'crypto';

@Injectable()
export class UserService {
  private googleClient: OAuth2Client;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(token: string): Promise<User | null> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const {
        providerId,
        provider,
        email,
        name,
        picture: image,
      } = payload as any;

      const user = await this.userModel.findOne({ email });

      if (providerId && !user) {
        const id = new Types.ObjectId();

        const newUser = new this.userModel({
          _id: id,
          email,
          name,
          providerId,
          image,
          provider,
        });
        // await this.emailService.sendWelcomeEmail(email);
        await newUser.save();
        return newUser;
      }

      return user;
    } catch (error) {
      console.error('Error in Google:', error);
      return null;
    }
  }

  async create({
    email,
    password,
    name,
    providerId,
    provider,
    image,
  }: {
    email: string;
    password?: string;
    name: string;
    providerId?: string;
    provider?: string;
    image?: string;
  }): Promise<UserDocument> {
    const normalizedEmail = email.toLowerCase();
    const isUserFound = await this.findByEmail(normalizedEmail);

    if (isUserFound && providerId) {
      return this.userModel.findOneAndUpdate(
        { email: normalizedEmail },
        { name, providerId, image },
      );
    }
    if (providerId && !isUserFound) {
      const id = new Types.ObjectId();

      const user = new this.userModel({
        _id: id,
        email: normalizedEmail,
        name,
        providerId,
        image,
        provider,
      });
      //   await this.emailService.sendWelcomeEmail(normalizedEmail);
      return user.save();
    }
    if (isUserFound) {
      throw new Error('Email already exists');
    }

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = pbkdf2Sync(
      password,
      salt,
      1000,
      64,
      'sha512',
    ).toString('hex');
    const id = new Types.ObjectId();
    const user = new this.userModel({
      _id: id,
      email: normalizedEmail,
      name,
      salt,
      password: hashedPassword,
    });
    // await this.emailService.sendWelcomeEmail(normalizedEmail);
    return user.save();
  }

  async findOne(email: string): Promise<User> {
    const normalizedEmail = email.toLowerCase();
    return await this.userModel.findOne({ email: normalizedEmail }).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const normalizedEmail = email.toLowerCase();
    return this.userModel.findOne({ email: normalizedEmail }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel
      .findById(new Types.ObjectId(id))
      .populate('subscription')
      .exec();
  }

  async update(id: string, data: any): Promise<UserDocument | null> {
    try {
      return this.userModel
        .findByIdAndUpdate(new Types.ObjectId(id), data, { new: true })
        .exec();
    } catch (err) {
      console.error('Error in updating the user', err);
      return err;
    }
  }

  async updatePicture(id: string, url: string): Promise<UserDocument | null> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          new Types.ObjectId(id),
          { image: url },
          { new: true },
        )
        .exec();
      return updatedUser;
    } catch (err) {
      return err;
    }
  }

  // async recoverPassword(email: string): Promise<void> {
  //   const normalizedEmail = email.toLowerCase();
  //   const user = await this.userModel
  //     .findOne({ email: normalizedEmail })
  //     .exec();
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   if (user?.email) {
  //     const response = await this.linkService.createResetLink({
  //       type: LinkType.passwordRecovery,
  //       email: user?.email,
  //       owner: user._id,
  //     });
  //     await this.emailService.sendRecoveryEmail({
  //       email: user?.email,
  //       link: response,
  //     });
  //   }
  // }

  // async resetPassword({
  //   resetId,
  //   newPassword,
  // }: {
  //   resetId: string;
  //   newPassword: string;
  // }): Promise<void> {
  //   const link = await this.linkService.findLinkById(resetId);
  //   if (!link || link.type !== LinkType.passwordRecovery) {
  //     throw new Error('Invalid reset link');
  //   }
  //   if (link.expiresAt && new Date(link.expiresAt.toString()) < new Date()) {
  //     throw new Error('Reset link has expired');
  //   }

  //   const userId = link.owner;

  //   try {
  //     const salt = randomBytes(16).toString('hex');
  //     const hashedPassword = pbkdf2Sync(
  //       newPassword,
  //       salt,
  //       1000,
  //       64,
  //       'sha512',
  //     ).toString('hex');
  //     await this.userModel
  //       .findByIdAndUpdate(new Types.ObjectId(userId), {
  //         password: hashedPassword,
  //         salt,
  //       })
  //       .exec();
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }

  async delete(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }
}

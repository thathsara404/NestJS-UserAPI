import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserCreationDTO } from '../dto/UserCreationDTO';
import { User, UserDocument } from '../db/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BasicErrorType } from '../type/error.type';
import { ConflictException } from '../exception/ConflictException';
import { LoggerService } from './logger.service';
import { PasswordService } from './password.service';
import { NotFoundException } from '../exception/NotFoundException';
import { UnAuthorizedException } from '../exception/UnAuthorizedException';
import { JwtService } from '@nestjs/jwt';
import { UserPatchDTO } from '../dto/UserPatchDTO';
import { PaginationDTO } from '../dto/PaginationDTO';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      this.logger.debug('Method getUserByEmail has been called');
      const userFound = await this.userModel.findOne({ email });
      if (!userFound) {
        throw new NotFoundException();
      }
      this.logger.debug(`User has been fetched: ${JSON.stringify(userFound)}`);
      return userFound;
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching a new user ${error.message}`,
      );
      throw error;
    }
  }

  async paginateUsers(pagination: PaginationDTO): Promise<any> {
    try {
      this.logger.debug('Method paginateUsers has been called');
      const { limit = 10, skip = 0 } = pagination;
      const result = await this.userModel
        .find()
        .skip(skip)
        .limit(limit)
        .select({ password: 0, _id: 0, __v: 0 })
        .exec();
      const total = await this.userModel.countDocuments({});
      this.logger.debug('Paginated records found');
      return { total: total, users: result };
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching paginated data ${error.message}`,
      );
      throw error;
    }
  }

  async patchUserByEmail(
    email: string,
    userPatchInfo: UserPatchDTO,
  ): Promise<User | null> {
    try {
      this.logger.debug('Method patchUserByEmail has been called');
      const userFound = await this.userModel.findOne({ email });
      if (!userFound) {
        throw new NotFoundException();
      }
      this.logger.debug(`User has been fetched: ${JSON.stringify(userFound)}`);
      userFound.firstName = userPatchInfo?.firstName || userFound.firstName;
      userFound.lastName = userPatchInfo?.lastName || userFound.lastName;
      const result = await userFound.save();
      this.logger.debug(`User has been patched ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching a new user ${error.message}`,
      );
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      this.logger.debug('Method validateUser has been called');
      const user = await this.getUserByEmail(email);
      if (!user) {
        this.logger.debug(`User not found: ${email}`);
        throw new NotFoundException();
      }

      const isPasswordValid = await this.passwordService.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        this.logger.debug(`Password not matched: ${email}`);
        this.logger.info(`Password not matched: ${email}`);
        throw new UnAuthorizedException();
      }
      this.logger.debug(`User found: ${email}`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userDTO: UserCreationDTO): Promise<User> {
    try {
      this.logger.debug('Method createUser has been called');
      const newUser = new this.userModel(userDTO);
      const hashedPassword = await this.passwordService.hashPassword(
        newUser.password,
      );
      newUser.password = hashedPassword;
      this.logger.debug(`User data to persist ${JSON.stringify(newUser)}`);
      const result = await newUser.save();
      this.logger.debug(
        `A new user has been created: ${JSON.stringify(result)}`,
      );
      return result;
    } catch (error) {
      const errorObj = error as BasicErrorType;
      if (errorObj.code.toString() === '11000') {
        this.logger.error(
          `Error occurred while inserting a new user ${errorObj.message}`,
        );
        throw new ConflictException();
      }
      throw error;
    }
  }

  async deleteUserByEmail(email: string): Promise<void> {
    try {
      this.logger.debug('Method deleteUserByEmail has been called');
      await this.userModel.findOneAndDelete({ email });
      this.logger.debug(`A user has been deleted: ${JSON.stringify(email)}`);
    } catch (error) {
      this.logger.error(
        `Error occurred while deleting a new user ${error.message}`,
      );
      throw error;
    }
  }

  async generateJwtToken(user: User): Promise<string> {
    try {
      const payload = { email: user.email };
      const token = await this.jwtService.sign(payload);
      this.logger.debug(`A token generated: ${JSON.stringify(token)}`);
      return token;
    } catch (error) {
      this.logger.error(`Error occurred while generating JWT ${error.message}`);
    }
  }
}

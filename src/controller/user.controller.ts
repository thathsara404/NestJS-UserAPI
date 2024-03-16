import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserCreationDTO } from '../dto/UserCreationDTO';
import { UserService } from '../service/user.service';
import { ConflictExceptionFilter } from 'src/filter/ConflictExceptionFilter';
import { LoggerService } from 'src/service/logger.service';
import { FetchUser } from 'src/type/response.type';
import { UserLoginDTO } from 'src/dto/UserLoginDTO';
import { UserPatchDTO } from 'src/dto/UserPatchDTO';
import { JwtGuard } from 'src/guard/JwtGuard';
import { PaginationDTO } from 'src/dto/PaginationDTO';

@Controller('/users')
@UseFilters(ConflictExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  @Get(':email')
  @UseGuards(JwtGuard)
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<FetchUser | null> {
    try {
      this.logger.debug(
        `Endpoint getUserByEmail has been called for the user: ${email}`,
      );
      const user = await this.userService.getUserByEmail(email);
      const preparedUser: FetchUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return preparedUser;
    } catch (error) {
      this.logger.error('Error occurred while calling the get user route');
      throw error;
    }
  }

  @Get()
  @UseGuards(JwtGuard)
  async paginateUsers(@Query() pagination: PaginationDTO) {
    try {
      this.logger.debug('Endpoint paginateUsers has been called');
      return this.userService.paginateUsers(pagination);
    } catch (error) {
      this.logger.error('Error occurred while calling the paginate users');
      throw error;
    }
  }

  @Patch(':email')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async patchUserByEmail(
    @Param('email') email: string,
    @Body(new ValidationPipe()) patchDTO: UserPatchDTO,
  ): Promise<void> {
    try {
      this.logger.debug(
        `Endpoint patchUserByEmail has been called for the user: ${email}`,
      );
      await this.userService.patchUserByEmail(email, patchDTO);
    } catch (error) {
      this.logger.error('Error occurred while calling the patch user route');
      throw error;
    }
  }

  @Post()
  async createUser(@Body(new ValidationPipe()) userDTO: UserCreationDTO) {
    try {
      this.logger.debug(
        `Endpoint createUser has been called for the user: ${JSON.stringify(userDTO)}`,
      );
      const user = userDTO;
      await this.userService.createUser(user);
    } catch (error) {
      this.logger.error('Error occurred while calling the create user route');
      throw error;
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body(new ValidationPipe()) userLoginDTO: UserLoginDTO) {
    try {
      this.logger.debug(
        `Endpoint loginUser has been called for the user: ${JSON.stringify(userLoginDTO)}`,
      );
      const { email, password } = userLoginDTO;
      const userFound = await this.userService.validateUser(email, password);
      const token = await this.userService.generateJwtToken(userFound);
      const loggedInUser: FetchUser = {
        email: userFound.email,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        authToken: token,
      };
      return loggedInUser;
    } catch (error) {
      this.logger.error('Error occurred while calling the create user route');
      throw error;
    }
  }

  @Delete(':email')
  @UseGuards(JwtGuard)
  async deleteUserByEmailGiven(@Param('email') email: string): Promise<void> {
    try {
      this.logger.debug(
        `Endpoint deleteUserByEmailGiven has been called for the user: ${JSON.stringify(email)}`,
      );
      await this.userService.deleteUserByEmail(email);
    } catch (error) {
      this.logger.error('Error occurred while calling the delete user route');
      throw error;
    }
  }
}

import { IsEmail, IsString } from 'class-validator';

export class UserPatchDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

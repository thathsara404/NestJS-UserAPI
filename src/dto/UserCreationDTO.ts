import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
const passwordRegex =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class UserCreationDTO {
  @IsNotEmpty({ message: 'User firstName is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'User lastName is required' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'User email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'User password is required' })
  @IsString()
  @Matches(passwordRegex, {
    message: 'User password does not meet requirements',
  })
  password: string;
}

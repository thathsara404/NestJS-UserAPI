import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsValidAddress } from 'src/decorator/address.validation';
import { validateName, validatePassword } from 'src/util/field.validation.util';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, validate: validateName })
  firstName: string;

  @Prop({ type: String, validate: validateName })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, validate: validatePassword })
  password: string;

  @Prop({
    type: { addressLineOne: String, addressLineTwo: String },
  })
  @IsValidAddress({
    message: (validationArgs) =>
      `Given address ${validationArgs.value} is not compatible with ${validationArgs.constraints}`,
  })
  address: {
    addressLineOne: string;
    addressLineTwo: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

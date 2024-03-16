import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Address } from 'src/type/field.type';
import { validateAddress } from 'src/util/field.validation.util';

@ValidatorConstraint({ name: 'IsAddressValid' })
export class IsAddressValid implements ValidatorConstraintInterface {
  validate(value: Address) {
    try {
      const result: boolean = validateAddress(value);
      return result;
    } catch (error) {
      return false;
    }
  }
}

export const IsValidAddress =
  (options?: ValidationOptions) => (object: any, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      validator: IsAddressValid,
    });

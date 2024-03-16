import { Address } from 'src/type/field.type';
import { ValidateSingleFieldFunc } from 'src/type/util.func.type';

export const validateName: ValidateSingleFieldFunc<string> = (name) => {
  return name && name.length <= 20;
};

export const validatePassword: ValidateSingleFieldFunc<string> = (password) => {
  if (!password || password.length < 8) {
    return false;
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
    password,
  );

  // return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  return true;
};

export const validateAddress: ValidateSingleFieldFunc<Address> = (address) => {
  const { addressLineOne, addressLineTwo } = address;
  if (addressLineOne && addressLineTwo) {
    return addressLineOne.length <= 50 && addressLineTwo.length <= 50;
  }
  return false;
};

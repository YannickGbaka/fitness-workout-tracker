import User from '../mongoose/schemas/user.schema.ts';

import { hashPassword } from '../utils/helper.util.ts'
import ApiError from '../utils/apiErrors.util.ts';
import { status } from 'http-status';

const register = async (firstName : string, lastName : string, email : string, password : string, role : string) => {
  if (await User.isEmailTaken(email)) {
    throw new ApiError(status.BAD_REQUEST, 'Email already taken');
  }
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashPassword(password),
    role,
  });
  const savedUser = await newUser.save();
  return savedUser;
};

const queryUsers = async (filter: object, options: object) => {
  const users = await User.paginate(filter, options);
  return users;
}

const findByEmail = async (email : string) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};


const checkIfExist = async (email : string) : Promise<boolean> => {
  const foundUser = await findByEmail(email);
  if (!foundUser) return false;
  return true;
};

export { register, findByEmail, findById, checkIfExist, queryUsers };

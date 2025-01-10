import User from '../mongoose/schemas/user.schema.ts';

import { hashPassword } from '../utils/helper.util.ts'

const register = async (firstName : string, lastName : string, email : string, password : string, role : string) => {
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

export { register, findByEmail, findById, checkIfExist };

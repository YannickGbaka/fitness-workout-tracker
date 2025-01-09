import User from '../mongoose/schemas/user.schema.ts';

import { hashPassword } from '../utils/helper.util.ts'

const register = async (firstName, lastName, email, password, role) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashPassword(password),
    role,
  });
  console.log(newUser);
  const savedUser = await newUser.save();
  return savedUser;
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const checkIfExist = async (email) => {
  const foundUser = await findByEmail(email);
  if (!foundUser) return false;
  return true;
};

export { register, findByEmail, findById, checkIfExist };

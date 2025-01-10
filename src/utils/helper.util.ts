const SALT_ROUND = 10;
import bcrypt from 'bcrypt';

const hashPassword = (rawPassword : string) : string => {
  const salt = bcrypt.genSaltSync(SALT_ROUND);
  return bcrypt.hashSync(rawPassword, salt);
};

const comparePassword = (plain : string, hashed: string | undefined | null) : string => {
  return bcrypt.compareSync(plain, hashed);
};

export {
  hashPassword,
  comparePassword,
};

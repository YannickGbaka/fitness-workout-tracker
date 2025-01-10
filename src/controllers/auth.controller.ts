import { validationResult, matchedData } from "express-validator";
import { findByEmail, register } from "../services/user.service.ts";
import { comparePassword } from "../utils/helper.util.ts";
import jwt from 'jsonwebtoken';
import catchAsync from "../utils/catchAsync.util.ts";
import status from "http-status";
import ApiError from "../utils/apiErrors.util.ts";

const signUp = catchAsync(async (request, response) =>{
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response.status(status.BAD_REQUEST).send({ errors: result.array() });
  }

  const { firstName, lastName, email, password, role } = request.body;

  const user = await register(
    firstName,
    lastName,
    email,
    password,
    role
  );
  return response.status(status.CREATED).send(user);
});

const login = catchAsync(async (request, response)=>{
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).json({ errors: result.array() });

    const { email, password } = matchedData(request);

    const user = await findByEmail(email);

    if (!user)
      throw new ApiError(status.NOT_FOUND, 'The provided email was not found');

    if (!comparePassword(password, user.password))
      throw new ApiError(status.UNAUTHORIZED, 'Incorrect email or password');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return response.status(status.OK).json({ token });
  });

export {signUp, login};


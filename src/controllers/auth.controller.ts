import { validationResult, matchedData } from "express-validator";
import { findByEmail, register } from "../services/user.service.ts";
import { comparePassword } from "../utils/helper.util.ts";
import jwt from 'jsonwebtoken';

const signUp =  async (request, response) =>{
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() });
    }

    const { firstName, lastName, email, password, role } = request.body;

    const user = await register(
      firstName,
      lastName,
      email,
      password,
      role
    );
    return response.status(201).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal server Error" });
  }
}

const login = async (request, response) => {
    try {
      const result = validationResult(request);
      if (!result.isEmpty())
        return response.status(400).json({ errors: result.array() });
  
      const { email, password } = matchedData(request);

      const user = await findByEmail(email);
  
      if (!user)
        return response
          .status(401)
          .json({ error: "Authentication failed, check credentials" });
      if (!comparePassword(password, user.password))
        return response
          .status(401)
          .json({ error: "Authentication failed, check credentials" });
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      return response.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" }); // Fixed status code and error message
    }
  };

export {signUp, login};


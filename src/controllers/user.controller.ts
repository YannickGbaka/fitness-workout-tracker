
import catchAsync from "../utils/catchAsync.util.ts";
import ApiError from "../utils/apiErrors.util.ts";
import * as userService from '../services/user.service.ts';
import { status as httpStatus} from "http-status";

const getUsers = catchAsync(async (request, response) => {
    const filter:{name, role} = request.query;

    const options:{sortBy, limit, page} = request.query;

    const result = await userService.queryUsers(filter, options);

    response.send(result);
  });

  const getUser = catchAsync(async (req, res) => {
    const user = await userService.findById(req.params.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  });
  
//   const updateUser = catchAsync(async (req, res) => {
//     const user = await userService.updateUserById(req.params.userId, req.body);
//     res.send(user);
//   });
  
//   const deleteUser = catchAsync(async (req, res) => {
//     await userService.deleteUserById(req.params.userId);
//     res.status(httpStatus.NO_CONTENT).send();
//   });

export {getUsers, getUser}
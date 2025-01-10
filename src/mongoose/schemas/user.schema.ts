import mongoose from "mongoose";
import paginate from "../plugins/paginate.plugin.ts";
import toJSON from "../plugins/toJSON.plugin.ts";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    min: 8,
  },
  role: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

UserSchema.plugin(toJSON);
UserSchema.plugin(paginate);


const User = mongoose.model("User", UserSchema);

export default User;

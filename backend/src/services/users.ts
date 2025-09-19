import User from "../models/User.js";

const getAllUsersService = async (myId: string) => {
  return await User.find({ _id: { $ne: myId } }).select("-password");
};

export { getAllUsersService };
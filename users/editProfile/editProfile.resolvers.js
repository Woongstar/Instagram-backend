import bcrypt from "bcrypt";
import client from "../../client";
import { protectResolver } from "../users.utils";
const resolverFn = async (
  _,
  { firstName, lastName, email, password: newPassword, userName },
  { loggedInUser }
) => {
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      userName,
      email,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "password updqte failed",
    };
  }
};
export default {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};

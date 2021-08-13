import { bcrypt } from "bcrypt";
import client from "../../client";
import { async } from "regenerator-runtime";
export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, email, password: newPassword, userName }
    ) => {
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id: 1,
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
    },
  },
};

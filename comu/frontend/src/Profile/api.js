import axios from "axios";

export const unFollowUser = async (userId, token) => {
  return await axios.patch(
    `http://localhost:8000/api/v1/accounts/users/follow/${userId}`,
    userId,
    {
      headers: {
        Authorization: "Token " + token,
      },
    }
  );
};

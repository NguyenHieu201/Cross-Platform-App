export const loginAction = ({ token, userInfo }) => {
  return {
    type: "LOGIN",
    payload: {
      token: token,
      userInfo: userInfo,
    },
  };
};

export const getListPostAction = ({ posts }) => {
  return {
    type: "GETLISTPOST",
    payload: {
      posts: posts,
    },
  };
};

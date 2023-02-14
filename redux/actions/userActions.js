export const loginAction = ({ token }) => {
  return {
    type: "LOGIN",
    payload: {
      token: token,
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

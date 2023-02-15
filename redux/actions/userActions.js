export const loginAction = ({ token, id }) => {
  return {
    type: "LOGIN",
    payload: {
      token: token,
      id: id,
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

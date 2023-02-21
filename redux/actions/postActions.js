export const updatePostAction = ({ post, index }) => {
  return {
    type: "UPDATEPOST",
    payload: {
      index: index,
      post: post,
    },
  };
};

export const addPostAction = ({ post }) => {
  return {
    type: "ADDPOST",
    payload: {
      post: post,
    },
  };
};

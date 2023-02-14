export const updatePostAction = ({ post, index }) => {
  return {
    type: "UPDATEPOST",
    payload: {
      index: index,
      post: post,
    },
  };
};

const initialState = {
  token: "",
  isLogin: false,
  posts: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("Login");
      return {
        ...state,
        token: action.payload.token,
        isLogin: true,
      };

    case "GETLISTPOST":
      console.log("ShowPost");
      return {
        ...state,
        posts: action.payload.posts,
      };

    case "UPDATEPOST":
      console.log("UpdatePost");
      const posts = state.posts;
      const index = action.payload.index;
      const updatePost = action.payload.post;
      posts[index] = updatePost;
      return {
        ...state,
        posts: posts,
      };
  }
};

export default reducers;

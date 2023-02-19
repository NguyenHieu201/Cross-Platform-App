import { io } from "socket.io-client";

const initialState = {
  token: "",
  isLogin: false,
  posts: [],
  socket: null,
  id: "",
  avatar: null,
  username: "",
  phonenumber: "",
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("Login");
      const socket = io("http://192.168.1.23:3000", {
        extraHeaders: { token: `${action.payload.token}` },
      });
      return {
        ...state,
        token: action.payload.token,
        isLogin: true,
        socket: socket,
        ...action.payload.userInfo,
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

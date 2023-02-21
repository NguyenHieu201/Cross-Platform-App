import axios from "axios";
import { base_url } from "./config";

export const createPostAPI = async ({ described, images, token }) => {
  return new Promise(async (resolve) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const data = {
      described: described,
      images: images,
    };

    console.log(images.length);

    await axios
      .post(`${base_url}/posts/create`, data, config)
      .then((res) => {
        return resolve({
          isSuccess: true,
          post: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const createCommentAPI = async ({ comment, postID, token }) => {
  return new Promise(async (resolve) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const data = {
      content: comment,
    };

    const url = `${base_url}/postComment/create/${postID}`;

    await axios
      .post(url, data, config)
      .then((res) => {
        const comment = res.data.data;
        return resolve({
          isSuccess: true,
          data: {
            __v: comment.__v,
            _id: comment._id,
            commentAnswered: comment.commentAnswered,
            content: comment.content,
            createdAt: comment.createdAt,
            post: comment.post,
            updatedAt: comment.updatedAt,
            user: comment.user,
          },
        });
      })
      .catch((err) => {
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const listCommentAPI = async ({ token, postID }) => {
  return new Promise(async (resolve) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = `${base_url}/postComment/list/${postID}`;
    await axios
      .get(url, config)
      .then((res) => {
        return resolve({
          isSuccess: true,
          comments: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const likeAPI = async ({ token, postID }) => {
  return new Promise(async (resolve) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = `${base_url}/postLike/action/${postID}`;
    const data = {};

    await axios
      .post(url, data, config)
      .then((res) => {
        // console.log(res.data.data);
        return resolve({
          isSuccess: true,
          data: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const getUserPostAPI = async ({ token, userId }) => {
  const url = `${base_url}/posts/list?userId=${userId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // const params = {
  //   userId: userId,
  // };
  return new Promise(async (resolve) => {
    await axios
      .get(url, config)
      .then((res) => {
        console.log(res.data);
        return resolve({
          isSuccess: true,
          posts: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const editPostAPI = async ({ token, postId, body }) => {
  const url = `${base_url}/posts/edit/${postId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = body;
  return new Promise(async (resolve) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        // console.log(res.data);
        return resolve({
          isSuccess: true,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

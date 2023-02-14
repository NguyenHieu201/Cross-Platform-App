const axios = require("axios");

// Register 100 account
const account = require("./MOCK_DATA.json");
const registerUrl = "http://192.168.1.23:8000/api/v1/users/register";
const loginUrl = "http://192.168.1.23:8000/api/v1/users/login";
const createPostUrl = "http://192.168.1.23:8000/api/v1/posts/create";

const registerAccount = async () => {
  for (let i = 0; i < account.length; i++) {
    const data = account[i];
    await axios
      .post(registerUrl, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
};

const loginAccount = async ({ phonenumber, password }) => {
  const data = {
    phonenumber: phonenumber,
    password: password,
  };
  return new Promise(async (resolve) => {
    await axios
      .post(loginUrl, data)
      .then((res) => {
        const token = res.data.token;
        return resolve({
          token: token,
          isSuccess: true,
          id: res.data.data.id,
        });
      })
      .catch((err) => {
        return resolve({
          isSuccess: false,
        });
      });
  });
};

const randomImageFunction = () => {
  const images = require("./MOCK_IMAGE.json");
  const i = Math.floor(Math.random() * 3);
  if (i == 3) return [images[0], images[1]];
  return images[i];
};

const createPost = async (user) => {
  const phonenumber = user.phonenumber;
  const password = user.password;
  const username = user.username;
  const images = randomImageFunction();
  const described = `This is first post of ${username}`;
  await loginAccount({ phonenumber: phonenumber, password: password }).then(
    async (res) => {
      if (res.isSuccess) {
        const token = res.token;
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const data = {
          described: described,
          images: images,
        };
        await axios
          .post(createPostUrl, data, config)
          .then((res) => {
            console.log("Success");
          })
          .catch((err) => {
            console.log("Error");
          });
      }
    }
  );
};

const sendInviteFriend = async ({ token, userId }) => {
  const url = "http://192.168.1.23:8000/api/v1/friends/set-request-friend";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    user_id: userId,
  };
  await axios
    .post(url, data, config)
    .then((res) => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err.response.data);
      console.log("Error");
    });
};

const inviteUser = async (acc1, acc2) => {
  await loginAccount(acc1).then(async (res1) => {
    if (res1.isSuccess) {
      await loginAccount(acc2).then(async (res2) => {
        const token = res1.token;
        const userId = res2.id;
        await sendInviteFriend({ token: token, userId: userId });
      });
    }
  });
};

const run = async () => {
  for (let i = 0; i < 20; i++) {
    for (let j = 99; j > 70; j--) {
      await inviteUser(account[j], account[i]);
    }
  }
};

run();

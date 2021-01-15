const axios = require("axios");
const config = require("../config");

async function getUserInfo(token) {
    return await axios({
        method: "get",
        url: `${config.apiUrl}/user`,
        headers: {
          Authorization: "bearer " + token,
        },
      }).then((response) => {
        return response.data;
      })
      .catch((err) => {return false});
  }

  module.exports = {
    getUserInfo: getUserInfo,
  };

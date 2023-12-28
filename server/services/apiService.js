/** @format */

// /src/services/apiService.js
const axios = require("axios");

const makeApiRequest = async (url, accessToken) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        Version: "2021-07-28",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error making API request: ${error.message}`);
  }
};

module.exports = { makeApiRequest };

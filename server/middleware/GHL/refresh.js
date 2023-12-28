/** @format */

const axios = require("axios");
const qs = require("qs");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
async function callback(req, res) {
  const data = qs.stringify({
    client_id: process.env.GHL_CLIENT_ID,
    client_secret: process.env.GHL_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: req.query.token,
    user_type: "Location",
    redirect_uri: process.env.GHL_REDIRECT,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://services.leadconnectorhq.com/oauth/token",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  const response = await axios.request(config).catch((err) => {});

  return res.json({ data: response?.data });
}

module.exports = callback;

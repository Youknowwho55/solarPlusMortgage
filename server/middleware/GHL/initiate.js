/** @format */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function initiateAuth(req, res) {
  const options = {
    requestType: "code",
    redirectUri: process.env.GHL_REDIRECT,
    clientId: process.env.GHL_CLIENT_ID,
    ghlBaseUrl: process.env.GHL_BASE_URL,
    scopes: ["contacts.readonly"],
  };
  console.log("Initiating authentication...");
  return res.redirect(
    `${options.ghlBaseUrl}/oauth/chooselocation?response_type=${
      options.requestType
    }&redirect_uri=${options.redirectUri}&client_id=${
      options.clientId
    }&scope=${options.scopes.join(" ")}`
  );
}

module.exports = initiateAuth;

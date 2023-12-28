/** @format */

const apiService = require("../services/apiService");

async function initiateAuth(req, res) {
  // Obtain the access token (replace with your logic)
  const accessToken = "123";

  // Make an API request using the service
  try {
    const apiResponse = await apiService.makeApiRequest(
      "https://services.leadconnectorhq.com/contacts/ocQHyuzHvysMo5N5VsXc",
      accessToken
    );
    console.log("API Response:", apiResponse);
    res.send(apiResponse); // or do something with the response
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = initiateAuth;

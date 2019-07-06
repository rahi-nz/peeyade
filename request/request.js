import Cookies from "universal-cookie";

const { create } = require("apisauce");

const baseURL = process.env.HOSTURL || "https://pydtest.com/api/web";
// initialize request based server cookies
const browserAccessToken = process.browser
  ? new Cookies().get("accessToken")
  : null;

// create main request configs
const request = (() => {
  return create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(process.browser && browserAccessToken
        ? { Authorization: `Bearer ${browserAccessToken}` }
        : {})
    }
  });
})();

// server middleware used to add required headers to request
const serverRequestModifier = (req, res, next) => {
  console.log("ServerReuqsstModifier:");
  // initialize request based server cookies
  const cookies = new Cookies(req.headers.cookie);

  const accessToken = cookies.get("accessToken")
    ? `Bearer ${cookies.accessToken}`
    : null; // default basic access token

  console.log("accessToken:", accessToken);
  request.setHeader("Authorization", accessToken);

  next();
};

module.exports = {
  request,
  serverRequestModifier,
  baseURL
};

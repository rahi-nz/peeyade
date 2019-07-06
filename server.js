const express = require("express");
const next = require("next");
const Cookies = require("universal-cookie");
const expressStaticGzip = require("express-static-gzip");
const { serverRequestModifier } = require("./request/request");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // the middleware used to serve .br and .gz files instead of js
  server.use(
    expressStaticGzip(__dirname, {
      enableBrotli: true,
      orderPreference: ["br", "gz"],
      index: false
    })
  );

  /**
   * Check if the user has jwt, otherwise redirect to login
   */
  server.use("*", (req, res, nxt) => {
    const cookies = new Cookies(req.headers.cookie);
    const accessToken = cookies.get("accessToken");
    const isLogin =
      req.originalUrl.includes("login") || req.originalUrl.includes("code");
    if (!accessToken && !isLogin) {
      return res.redirect("/login");
    }
    if (accessToken && isLogin) {
      return res.redirect("/");
    }

    return nxt();
  });

  /**
   * Modify request file to be able to handle requests in server side
   */
  server.use("*", serverRequestModifier);

  server.get("*", (req, res) => {
    /**
     * This is used to add trailing slash,
     * Next returns 404 error if this is not added (/home and /home/ are different)
     * https://github.com/zeit/next.js/issues/1189
     */
    req.url = req.url.replace(/\/$/, "");
    if (req.url === "") {
      req.url = "/";
    }
    // default next js route server
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });

  // server.post("/loadKey", (req, res) => {
  //   const { key } = req.body;
  //   // Do whatever you need to do
  //   const actualPage = "/";
  //   const queryParams = { key };
  //   next({ dev }).render(req, res, actualPage, queryParams);
  // });
});

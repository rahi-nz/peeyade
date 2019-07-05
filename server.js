const express = require("express");
const next = require("next");
const expressStaticGzip = require("express-static-gzip");

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
});

const proxy = require("http-proxy-middleware");
// const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  // app.use(
  //   "/api",
  //   proxy({
  //     // createProxyMiddleware({
  //     target: "http://localhost:8080",
  //     changeOrigin: true,
  //   })
  // );
  app.use("/ws-stomp", proxy({ target: "http://localhost:8081", ws: true }));
  // app.use("/ws-stomp", createProxyMiddleware({ target : "http://localhost:8080", ws: true }));
};

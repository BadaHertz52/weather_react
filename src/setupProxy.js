const {createProxyMiddelware}= require("http-proxy-middleware");

module.exports =function (app){
  app.use(
    createProxyMiddelware (
      '/',{
        target:"http:localhost:5000",
        changeOrigin:true
      }
    )
  )
};
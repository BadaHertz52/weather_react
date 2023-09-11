const axios = require("axios");
const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const publicApiKey = process.env.REACT_APP_PUBLIC_KEY;

const kakaoApiKey = process.env.REACT_APP_KAKAO_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/weather_react", express.static(path.join(__dirname, "build")));

app.get("/weather_react", function (_, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});
app.post("/weather_react/area", async (req, res) => {
  const { longitude, latitude } = req.body;

  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;

  try {
    const result = await axios({
      method: "get",
      url: url,
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    });
    res.send(result.data.documents);
  } catch (error) {
    console.error("area", error);
    res.json({ message: "[Error] Fail get area data" });
  }
});
const getPublicAPIdata = async (req, res) => {
  const url = req.body.url;
  const apiUrl = `${url}&serviceKey=${publicApiKey}`;
  try {
    const result = await axios.get(apiUrl);
    const body = result.data.response.body;
    if (body !== undefined) {
      const items = body.items;
      res.send(items);
    } else {
      const error = " response.body is undefined";
      res.json({ message: error });
    }
  } catch (error) {
    console.error("server error", error, apiUrl);
    res.json({ message: "Fail fetch" });
  }
};
app.post("/weather_react/sky", async (req, res) => {
  await getPublicAPIdata(req, res);
});
app.post("/weather_react/usncst", async (req, res) => {
  await getPublicAPIdata(req, res);
});
app.post("/weather_react/svfcast", async (req, res) => {
  await getPublicAPIdata(req, res);
});
app.post("/weather_react/midFcast_landItems", async (req, res) => {
  await getPublicAPIdata(req, res);
});
app.post("/weather_react/midFcast_taItems", async (req, res) => {
  await getPublicAPIdata(req, res);
});
app.post("/weather_react/apNow", async (req, res) => {
  await getPublicAPIdata(req, res);
});
app.post("/weather_react/apfcst", async (req, res) => {
  await getPublicAPIdata(req, res);
});
app.post("/weather_react/sunInfo", async (req, res) => {
  const url = req.body.url;
  try {
    const result = await axios.get(`${url}&ServiceKey=${publicApiKey}`);
    const response = result.data.response;
    const item = response.body.items.item;
    res.send(item);
  } catch (error) {
    const e = `[Error]: fail fetch`;
    console.error("sunInfo error", error);
    res.json({ message: e });
  }
});
app.listen(port, () => {
  console.log("hello server", port);
});

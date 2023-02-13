const express =require('express');
const app = express();
const port = 5000;
const path = require('path');

app.use('/weather_react',express.static(path.join(__dirname, 'build')));

app.get('/weather_react', function (req, res) {
  res.sendFile( path.join(__dirname, 'build/index.html'));
});
app.listen(port, ()=>{
  console.log("hello server")
});
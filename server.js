const axios =require('axios');
const express= require('express');
const app = express();
const port = 5000;
const path = require('path');
const bodyParser =require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/weather_react',express.static(path.join(__dirname, 'build')));

app.get('/weather_react', function ( _,res) {
  res.sendFile( path.join(__dirname, 'build/index.html'));

});
const getAPdata =async(req, res)=>{
  const url = req.body.url;
  try {
    const result = await axios.get(url);
    const body = result.data.response.body;
    if(body !==undefined){
      const items =body.items;
      res.send(items);
    }else{
      const error = " response.body is undefined";
      
      res.json({message:error});
    }

  } catch (error) {
    res.json({message:error});
  };
}

app.post('/weather_react/apNow', async(req, res)=>{
  await getAPdata(req, res)
} );
app.post('/weather_react/apFcst', async(req, res)=>{
  await getAPdata(req, res)
} );
app.post('/weather_react/sunInfo', async(req, res)=>{
  const url = req.body.url;
  try {
    const result = await axios.get(url);
    const response = result.data.response;
    const item =response.body.items.item;
    res.send(item);
  } catch (error) {
    const e = `[Error]: ${error}`;
    res.json({message:e});
  }
})
app.listen(port, ()=>{
  console.log("hello server", port);
  console.log("env",  process.env.REACT_APP_PUBLIC_KEY);
});
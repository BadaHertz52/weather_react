import React from 'react';
import { NowWeather } from '../modules/weather';

type NowProperty ={
  nowWeather : NowWeather
};
const Now =({nowWeather}:NowProperty)=>{
    return(
      <div className="now">
        <div className="inner">
          
        </div>
      </div>
    )
};

export default React.memo(Now);
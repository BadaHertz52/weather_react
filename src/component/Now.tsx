import React from 'react';
import { NowWeather, SunRiseAndSet, TomorrowWeather } from '../modules/weather';
import SkyIcon from './SkyIcon';

type NowProperty ={
  nowWeather : NowWeather,
  tomrrowWeather: TomorrowWeather,
  todaySunInform: Error | SunRiseAndSet
};
const Now =({nowWeather ,tomrrowWeather , todaySunInform}:NowProperty)=>{
    return(
      <div className="now">
        <div className="inner">
          <div className="now_now">
            <div className="summaryImg">
              <SkyIcon
                skyType={nowWeather.sky}
              />
            </div>
            <div className="summary"></div>
          </div>
          <div className="now_quickArea">

          </div>
        </div>
      </div>
    )
};

export default React.memo(Now);
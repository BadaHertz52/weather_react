import React from 'react';
import { RiDropFill } from 'react-icons/ri';
import styled from 'styled-components';
import { gradeArry, NowWeather, SunRiseAndSet, TomorrowWeather } from '../modules/weather';
import SkyIcon from './SkyIcon';
const PmDd = styled.dd`
color: ${
props =>
  props.className === gradeArry[0]?
  "#15921b"
  :
  props.className === gradeArry[1]?
  "#42a5f5"
  :
  props.className === gradeArry[2]?
  "#ff7b00"
  :
  "#ef5350"
};
`;
type PopIconProperty ={
  pop:number
}
const PopIcon =({pop}:PopIconProperty)=>{
  return(
    <div className='popIcon weatherIcon'>
      <svg width="0" height="0">
        <linearGradient id="pop_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop  stopColor="#e3e3e3" offset={JSON.stringify(100 - pop)} />
          <stop  stopColor="#0098d8" offset="100%" />
        </linearGradient>
      </svg>
      <div style={{ fill: "url(#pop_gradient)" }} >
          <RiDropFill/>
      </div>
    </div>
  )
}
type AmPmTrProperty ={
  am:boolean,
  tomrrowWeather: TomorrowWeather,
  day:boolean
}
const AmPmTr =({am ,tomrrowWeather, day}:AmPmTrProperty)=>{
  const weatherData = am? tomrrowWeather.am : tomrrowWeather.pm; 
  return (
    <tr>
      <th scope='row'>
        <span className='term'>
          내일
          {am? "오전":"오후" }
        </span>
      </th>
      {/* sky  , tmo*/}
      <td>
        <SkyIcon
          day ={day}
          skyType ={weatherData.sky}
        />
        <dl>
          <dt className='blind'>기온</dt>
          <dd>
            {am ? tomrrowWeather.tmn : tomrrowWeather.tmx}
            <span className='degree'>°</span>
          </dd>
        </dl>
      </td>
      {/* 강수량 */}
      <td>
        <PopIcon pop ={weatherData.pop} />
        <dl>
          <dt className='blind'>강수 확률</dt>
          <dd>
            {Math.round(weatherData.pop)}
            <span className='unit'>%</span>
          </dd>
        </dl>
      </td>
      {/*미세*/}
      <td>
        <dl>
          <dt>미세</dt>
          <PmDd className={tomrrowWeather.pm10Grade} >
            {tomrrowWeather.pm10Grade}
          </PmDd>
        </dl>
        <dl>
          <dt>초미세</dt>
          <PmDd className={tomrrowWeather.pm25Grade} >
            {tomrrowWeather.pm25Grade}
          </PmDd>
        </dl>
      </td>
    </tr>
  )
};

type NowProperty ={
  nowWeather : NowWeather,
  tomrrowWeather: TomorrowWeather,
  todaySunInform: Error | SunRiseAndSet
};
const Now =({nowWeather ,tomrrowWeather , todaySunInform}:NowProperty)=>{
    const now = new Date();
    const hours = now.getHours()
    const day :boolean = hours < 18 ? true :false;
    const sunInformError =todaySunInform instanceof Error ;

    const showPre=()=>{

    };

    const showNext =()=>{

    };
    return(
      <div className="now">
        <div className="inner">
          <div className="now_now">
            <div className="summaryImg">
              <SkyIcon
                skyType={nowWeather.sky}
                day={day}
              />
              <div className='temp'>
                <span className='blind'>
                  현재 온도
                </span>
                {nowWeather.tmp}
                <span className="degree">
                °
                </span>
              </div>
            </div>
            <div className="summary">
              {nowWeather.sky}
            </div>
          </div>
          <div className="now_quickArea">
            <div className="scrollControl">
              <div className="scrollArea">
                <div className="summary_wrap">
                  <div className="summary current">
                    <div className="summary_inner">
                      <ul className='summary_table'>
                        <li>
                          <dl>
                            <dt>습도</dt>
                            <dd>
                              {nowWeather.reh}
                              <span className='unit'>
                                %
                              </span>
                            </dd>
                          </dl>
                        </li>
                        <li>
                          <dl>
                            <dt>
                              {nowWeather.wind.vec}
                            </dt>
                            <dd>
                              {nowWeather.wind.wsd}
                              <span className='unit'>
                                m/s
                              </span>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                      <ul className='summary_table'>
                        <li>
                          <dl>
                            <dt>미세</dt>
                            <PmDd className={nowWeather.pm10Grade}>
                              {nowWeather.pm10Grade}
                            </PmDd>
                          </dl>
                        </li>
                        <li>
                          <dl>
                            <dt> 초미세</dt>
                            <PmDd className={nowWeather.pm25Grade}>
                              {nowWeather.pm25Grade}
                            </PmDd>
                          </dl>
                        </li>
                        <li>
                          <dl>
                            <dt>일몰</dt>
                            <dd>
                              {!sunInformError ?
                                todaySunInform.sunSet
                                :
                                "error"
                              }
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="summary tomorrow">
                    <div className="summary_inner">
                      <table className='summary_table'>
                        <tbody>
                          <AmPmTr
                            am={true}
                            tomrrowWeather={tomrrowWeather}
                            day={day}
                          />
                          <AmPmTr
                            am={false}
                            tomrrowWeather={tomrrowWeather}
                            day={day}
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tabList">
                <button className='tabBtn on' onClick={showPre}>
                  현재 날씨
                </button>
                <button className='tabBtn' onClick={showNext}>
                  내일 날씨
                </button>
              </div>
              <button className='btn_prev' onClick={showPre}>
                이전 보기
              </button>
              <button className='btn_next' onClick={showNext}>
                다음 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
};

export default React.memo(Now);
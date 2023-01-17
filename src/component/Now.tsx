import React , {useRef ,useState ,useEffect , MouseEvent , TouchEvent} from 'react';
import { GiWaterDrop } from 'react-icons/gi';
import styled, { CSSProperties } from 'styled-components';
import { gradeArry, NowWeather, SunRiseAndSet, TomorrowWeather } from '../modules/weather';
import ScrollBtn from './ScrollBtn';
import SkyIcon from './SkyIcon';
const PmDd = styled.dd`
color: ${
props =>
  props.className === gradeArry[0]?
  "#42a5f5"
  :
  props.className === gradeArry[1]?
  "#15921b"
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
      <div style={{ fill: "url(#pop_gradient)" }}  className="iconWrap">
          <GiWaterDrop/>
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
    const wrapRef =useRef<HTMLDivElement>(null);
    const currentWrapStyle :CSSProperties ={
      transform:"translateX(0%)"
    };
    const tomorrowWrapStyle :CSSProperties ={
      transform:`translateX(-100%)`
    };
    const [wrapStyle ,setWrapStyle]=useState<CSSProperties>(currentWrapStyle);
    const scrollEvent = useRef<boolean>(false);
    const startX = useRef<number>(0);
    const moveX = useRef<number>(0);
    const current ="current";
    const tomorrow ="tomorrow";
    type SummaryType = typeof current| typeof tomorrow;
    const initialSummary = useRef<SummaryType>(current);

    const showCurrent=()=>{
      initialSummary.current = current 
      setWrapStyle(currentWrapStyle);
    };

    const showTomorrow =()=>{
      initialSummary.current =tomorrow ;
      setWrapStyle(tomorrowWrapStyle);
    };
    const startScroll =(clientX : number)=>{
      if(wrapStyle !==undefined){
        startX.current =clientX;
        scrollEvent.current =true; 
      }
    }
    const moveScroll =(clientX :number)=>{
      if(scrollEvent.current && wrapStyle !==undefined){
        moveX.current =clientX;
        const gap  = clientX  - startX.current;

        const conditionMoveCurrent = initialSummary.current ==="current"  && (gap < 0);
        const conditionTommorowCurrent = initialSummary.current ==="tomorrow" && (gap > 0) ;
        const wrapWidth =wrapStyle.width as string;
        const widthNum : number= Number(wrapWidth.slice(0,wrapWidth.indexOf("px")));
        const percent =(gap / widthNum) * 100 
        if(conditionMoveCurrent || conditionTommorowCurrent){
          setWrapStyle({
            ...wrapStyle,
            transform: conditionMoveCurrent ?
                        `translateX(${percent}%)`
                      :
                      `translateX(${-100 + percent}%)`
        })
        };
      }
    }
    const endScroll =()=>{
      
      if( scrollEvent.current && wrapRef.current !==null){
          const transform = wrapRef.current.style.transform;
          const startIndex= transform.indexOf("(");
          const lastIndex= transform.indexOf("%");
          const x = Number(transform.slice(startIndex+1, lastIndex));
          if(initialSummary.current === current)
          {
            (x >= -50) ?
            setWrapStyle(currentWrapStyle)
            :
            initialSummary.current = tomorrow
          }
          if(initialSummary.current === tomorrow
          ){
            (x <= -50) ?
            setWrapStyle(tomorrowWrapStyle)
            :
            initialSummary.current = current;
          }
      };
      scrollEvent.current = false; 
      startX.current = 0;
      moveX.current =0;
    }


    return(
        <div className="now">
          <div className="now_now">
            <div className="summaryImg">
              <SkyIcon
                skyType={nowWeather.sky}
                day={day}
              />
            </div>
            <div className="summary">
            <div className='temp'>
                <span className='blind'>
                  현재 온도
                </span>
                {nowWeather.tmp}
                <span className="degree">
                °
                </span>
              </div>
              <div className="sky">
                {nowWeather.sky}
              </div>
              
            </div>
          </div>
          <div className="now_quickArea">
            <div className="scrollControl">
              <div className="scrollArea"
                onMouseDown={(event)=>startScroll(event.clientX)}
                onMouseMove={(event)=>moveScroll(event.clientX)}
                onMouseUp={endScroll}
                onTouchStart={(event)=>startScroll(event.touches[0].clientX)}
                onTouchMove={(event)=>moveScroll(event.touches[0].clientX)}
                onTouchEnd={endScroll}
              >
                <div className="summary_wrap" style={wrapStyle} ref={wrapRef}>
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
                <button 
                  className={initialSummary.current ===current? 'tabBtn on': 'tabBtn'} 
                  onClick={showCurrent}
                  name="현재 날씨"
                >
                </button>
                <button 
                  className={initialSummary.current ===tomorrow? 'tabBtn on': 'tabBtn'} 
                  onClick={showTomorrow}
                  name="내일 날씨"
                >
                </button>
              </div>
              <ScrollBtn
                clickEvent ={showCurrent}
                className ={`now_scrollBtn ${initialSummary.current === tomorrow ? 'on' :''}`} 
                name="이전 보기"
                pre={true}
              />
              <ScrollBtn
                className={`now_scrollBtn ${initialSummary.current === current ?'on':''}`} 
                clickEvent={showTomorrow}
                name="다음 보기"
                pre={false}
              />
            </div>
          </div>
        </div>
    )
};

export default React.memo(Now);
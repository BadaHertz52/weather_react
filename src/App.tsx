import React from 'react';
import {inqury_short_ultraSrtFcst, shortFcstApi, shortInqury} from './modules/api';
function App() {
  // /**
  //  * 
  //  * @param inqury 
  //  * @param baseDate 빌표일자
  //  * @param baseTime  발표시각
  //  * @param nx 예보지점 x좌표
  //  * @param ny  예보지점 y좌표
  //  */
  // const getShort =(inqury:shortInqury, baseDate:number, baseTime:number, nx:number, ny:number)=>{
  //   const url =`${shortFcstApi.url}/${inqury}?serviceKey=${shortFcstApi.key}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
  //   console.log("url", url);
  //   fetch(url )
  //   .then((response)=> response.json())
  //   .then(data => console.log("data", data))
  //   .catch(e=>console.log("error",e));
  // };
  // getShort(inqury_short_ultraSrtFcst, 20221211, 1500,60,128);
  return (
    <div className="App">
    </div>
  );
}

export default App;

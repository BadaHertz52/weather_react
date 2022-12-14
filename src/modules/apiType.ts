/**
 * 초단기 실황 api data 속 item의 type
 */
export type USNcstItem ={
  baseDate:string,
  baseTitme:string,
  category:string,
  nx:string,
  ny:string,
  obsrValue:string
};
/**
 * 초단기 실황 api data 속 item의 type
 */
export type SFcstItem ={
  baseDate:string,
  baseTitme:string,
  fcstDate:string,
  fcstTime:string,
  category:string,
  nx:string,
  ny:string,
  fstValue:string
};
/**
 * 초단기 실황 data
*/
export type USNcst ={
  //강수형태
  pty:string,
  //습도(%)
  reh:string,
  // 1시간 강수량(mm)
  rn1:string,
  //기온
  t1h:number,
  //풍향(deg)
  vec:number,
  //풍속(m/s)
  wsd:string
};
/**
 * 초단기 예보 data
 */
export type USFcst = USNcst & {
  sky:string
};
/**
 * 단기 예보 data
 */
export type SVFcst ={
  //강수확률
  pop: string,
  pty:string,
  //1시간 강수량
  pcp:string,
  reh:string,
  //1시간 신적설(cm)
  sno:string,
  sky:string,
  //1시간 기온
  tmp:number,
  vec:number,
  wsd:string
};

//중기 예보
export type MidLandFcstItem ={
  wf3Am:string ,
  wf3Pm:string ,
  wf4Am:string ,
  wf4Pm:string ,
  wf5Am:string ,
  wf5Pm:string ,
  wf6Am:string ,
  wf6Pm:string ,
  wf7Am:string ,
  wf7Pm:string 
};
export type MidLandFcstDay ={
  dyalater:string,
  wfAm:string,
  wfPm:string
};
export type MidLandFcst =MidLandFcstDay[];

export type MidFcst ={
  daylater:number
  wf:string,
}[];
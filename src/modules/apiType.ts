
/**
 * 초단기 실황,초단기 예보 ,단기 예보 api data 속 item 의 공통 properties
 */
export type SFcstItemBase ={
  numOfRows :string,
  pageNo :string,
  totalCount:string, 
  resultCode:string, 
  resultMsg :string,
  dataType :string,
  baseDate :string,
  baseTime :string,
  category :string,
  nx :string,
  ny :string
};
export type USNcstItem = SFcstItemBase & {
  obsrValue : string
}
/**
 * 초단기 예보, 단기 예보 api item의 properties type
 */
export type SFcstItem = SFcstItemBase & {
  // 예보 값
  fcstValue :string,
  // 예보 날짜
  fcstDate :string,
  //예보 시각
  fcstTime :string,
};
/**
 * 초단기 실황 data
*/
export type USNcst ={
  baseDate:string,
  baseTime:string,
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
 * 단기 예보 data
 */
export type SVFTime ={
  //예보 날짜
  fcstDate:string,
  //예보 시각
  fcstTime:string,
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
  //일 최저 기온
  tmn:number,
  //일 최고 기온
  tmx:number,
  vec:number,
  wsd:string
};
export type SVFDay = SVFTime[];
export type SVFcst =SVFDay[];
//중기 예보

export type MidLandFcst ={
  dyalater:number,
  /**
   * 오전 날씨
   */
  wfAm:string,
  /**
   * 오후 날씨
   */
  wfPm:string,
  /**
   * 오전 강수 확률
   */
  rnStAm:string,
  /**
   * 오후 강수 확률
   */
  rnStPm:string,
}[];
export type MidTaFcst ={
  daylater:number,
  taMin:number,
  taMax:number
}[];
export type MidFcst ={
  daylater:number
  wf:string,
}[];
export type KakaoDocumentType = {
  /** H(행정동) 또는 B(법정동) */
  region_type: string;
  /** 전체 지역 명칭 */
  address_name: string;
  /**
   * 시도 단위
   */
  region_1depth_name: string;
  /**
   * 구 단위
   */
  region_2depth_name: string;
  /**
   * 동 단위
   */
  region_3depth_name: string;
  /**
   * region_type이 법정동이며, 리 영역인 경우만 존재
   */
  region_4depth_name: string;
  /**
   * region 코드
   */
  code: string;
  /**
   * longitude
   */
  x: number;
  /**latitude */
  y: number;
};

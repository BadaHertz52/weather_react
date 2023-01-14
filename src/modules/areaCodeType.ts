//중기육상예보구역 코드
const midLand_서울인천경기도 ="11B00000";
const midLand_강원도영서 ="11D10000";
const midLand_강원도영동 ="11D20000";
const midLand_대전세종충남 ="11C20000";
const midLand_충북 ="11C10000";
const midLand_광주전남 ="11F20000";
const midLand_전북 ="11F10000";
const midLand_대구경북 ="11H10000";
const midLand_부산울산경남 ="11H20000";
const midLand_제주 ="11G00000";


export type MidLandAreaCode = typeof midLand_서울인천경기도|
                        typeof midLand_강원도영서 |
                        typeof midLand_강원도영동 |
                        typeof midLand_대전세종충남 |
                        typeof midLand_충북 |
                        typeof midLand_광주전남|
                        typeof midLand_전북|
                        typeof midLand_대구경북 |
                        typeof midLand_부산울산경남 |
                        typeof midLand_제주 ;

export const midLandAreaCodeZip :MidLandAreaCode[] =[
  midLand_서울인천경기도 ,
  midLand_강원도영서 ,
  midLand_강원도영동 ,
  midLand_대전세종충남 ,
  midLand_충북,
  midLand_광주전남 ,
  midLand_전북 ,
  midLand_대구경북,
  midLand_부산울산경남 ,
  midLand_제주 
];

export const west =["철원군", "화천군" ,"양구군", "인제군", "춘천시", "홍천군", "횡성군","원주시","평창군","영월군", "정선군"];

export const east =["강릉시", "삼척시", "태백시", "동해시", "양양군", "속초시", "고성군"];
                        
// 중기 기온 예보 구역 코드
const midTa_백령도 ="11A00101";
const midTa_서울 ="11B10101"; 
const midTa_과천 ="11B10102";
const midTa_광명 ="11B10103";
const midTa_강화="11B20101"; 
const midTa_김포="11B20102"; 
const midTa_인천="11B20201"; 
const midTa_시흥="11B20202"; 
const midTa_안산="11B20203"; 
const midTa_부천="11B20204"; 
const midTa_의정부="11B20301"; 
const midTa_고양="11B20302"; 
const midTa_양주="11B20304"; 
const midTa_파주="11B20305"; 
const midTa_동두천="11B20401"; 
const midTa_연천="11B20402"; 
const midTa_포천="11B20403"; 
const midTa_가평="11B20404"; 
const midTa_구리="11B20501"; 
const midTa_남양주="11B20502"; 
const midTa_양평="11B20503"; 
const midTa_하남="11B20504"; 
const midTa_수원="11B20601"; 
const midTa_안양="11B20602"; 
const midTa_오산="11B20603"; 
const midTa_화성="11B20604"; 
const midTa_성남="11B20605"; 
const midTa_평택="11B20606"; 
const midTa_의왕="11B20609"; 
const midTa_군포="11B20610"; 
const midTa_안성="11B20611"; 
const midTa_용인="11B20612"; 
const midTa_이천="11B20701"; 
const midTa_광주_경기도="11B20702"; 
const midTa_여주="11B20703"; 
const midTa_충주="11C10101"; 
const midTa_진천="11C10102"; 
const midTa_음성="11C10103"; 
const midTa_제천="11C10201"; 
const midTa_단양="11C10202"; 
const midTa_청주="11C10301"; 
const midTa_보은="11C10302"; 
const midTa_괴산="11C10303"; 
const midTa_증평="11C10304"; 
const midTa_추풍령="11C10401";
const midTa_영동="11C10402";
const midTa_옥천="11C10403";
const midTa_서산="11C20101";
const midTa_태안="11C20102";
const midTa_당진="11C20103";
const midTa_홍성="11C20104";
const midTa_보령=	"11C20201";
const midTa_서천=	"11C20202";
const midTa_천안=	"11C20301";
const midTa_아산=	"11C20302";
const midTa_예산=	"11C20303";
const midTa_대전= "11C20401";
const midTa_공주= "11C20402";
const midTa_계룡= "11C20403";
const midTa_세종= "11C20404";
const midTa_부여= "11C20501";
const midTa_청양= "11C20502";
const midTa_금산= "11C20601";
const midTa_논산= "11C20602";
const midTa_철원= "11D10101";
const midTa_화천= "11D10102";
const midTa_인제= "11D10201";
const midTa_양구= "11D10202";
const midTa_춘천= "11D10301";
const midTa_홍천= "11D10302";
const midTa_원주= "11D10401";
const midTa_횡성= "11D10402";
const midTa_영월= "11D10501";
const midTa_정선= "11D10502";
const midTa_평창= "11D10503";
const midTa_대관령 = "11D20201";
const midTa_태백	 = "11D20301";
const midTa_속초	 = "11D20401";
const midTa_고성_강원도	 = "11D20402";
const midTa_양양	 = "11D20403";
const midTa_강릉	 = "11D20501";
const midTa_동해	 = "11D20601";
const midTa_삼척	 = "11D20602";
const midTa_울릉도="1.10E+102";
const midTa_독도	="1.10E+103";
const midTa_전주	="11F10201";
const midTa_익산	="11F10202";
const midTa_정읍	="11F10203";
const midTa_완주	="11F10204";
const midTa_장수	="11F10301";
const midTa_무주	="11F10302";
const midTa_진안	="11F10303";
const midTa_남원	="11F10401";
const midTa_임실	="11F10402";
const midTa_순창	="11F10403";
const midTa_군산	="21F10501";
const midTa_김제	="21F10502";
const midTa_고창	="21F10601";
const midTa_부안	="21F10602";
const midTa_함평	="21F20101";
const midTa_영광	="21F20102";
const midTa_진도	="21F20201";
const midTa_완도	="11F20301";
const midTa_해남	="11F20302";
const midTa_강진	="11F20303";
const midTa_장흥	="11F20304";
const midTa_여수	="11F20401";
const midTa_광양	="11F20402";
const midTa_고흥	="11F20403";
const midTa_보성	="11F20404";
const midTa_순천시= "11F20405";
const midTa_광주	= "11F20501";
const midTa_장성	= "11F20502";
const midTa_나주	= "11F20503";
const midTa_담양	= "11F20504";
const midTa_화순	= "11F20505";
const midTa_구례	= "11F20601";
const midTa_곡성	= "11F20602";
const midTa_순천	= "11F20603";
const midTa_흑산도= "11F20701";
const midTa_목포	= "21F20801";
const midTa_영암	= "21F20802";
const midTa_신안	= "21F20803";
const midTa_무안	= "21F20804";
const midTa_성산	= "11G00101";
const midTa_제주	= "11G00201";
const midTa_성판악 = "11G00302";
const midTa_서귀포  = "11G00401";
const midTa_고산	 = "11G00501";
const midTa_이어도= "11G00601";
const midTa_추자도= "11G00800";
const midTa_울진	="11H10101";
const midTa_영덕	="11H10102";
const midTa_포항	="11H10201";
const midTa_경주	="11H10202";
const midTa_문경	="11H10301";
const midTa_상주	="11H10302";
const midTa_예천	="11H10303";
const midTa_영주	="11H10401";
const midTa_봉화	="11H10402";
const midTa_영양	="11H10403";
const midTa_안동	="11H10501";
const midTa_의성	="11H10502";
const midTa_청송	="11H10503";
const midTa_김천	="11H10601";
const midTa_구미	="11H10602";
const midTa_군위	="11H10603";
const midTa_고령	="11H10604";
const midTa_성주	="11H10605";
const midTa_대구	="11H10701";
const midTa_영천	="11H10702";
const midTa_경산	="11H10703";
const midTa_청도	="11H10704";
const midTa_칠곡	="11H10705";
const midTa_울산	="11H20101";
const midTa_양산	="11H20102";
const midTa_부산	="11H20201";
const midTa_창원	="11H20301";
const midTa_김해	="11H20304";
const midTa_통영	="11H20401";
const midTa_사천	="11H20402";
const midTa_거제	="11H20403";
const midTa_고성_경남	="11H20404";
const midTa_남해	="11H20405";
const midTa_함양	="11H20501";
const midTa_거창	="11H20502";
const midTa_합천	="11H20503";
const midTa_밀양	="11H20601";
const midTa_의령	="11H20602";
const midTa_함안	="11H20603";
const midTa_창녕	="11H20604";
const midTa_진주	="11H20701";
const midTa_산청	="11H20703";
const midTa_하동	="11H20704";
const midTa_사리원="11I10001";
const midTa_신계	="11I10002";
const midTa_해주	="11I20001";
const midTa_개성	="11I20002";
const midTa_장연_용연 ="11I20003";
const midTa_신의주="11J10001";
const midTa_삭주_수풍 ="11J10002";
const midTa_구성	= "11J10003";
const midTa_자성_중강 ="11J10004";
const midTa_강계	="11J10005";
const midTa_희천	="11J10006";
const midTa_평양	="11J20001";
const midTa_진남포_남포 ="11J20002";
const midTa_안주	="11J20004";
const midTa_양덕	="11J20005";
const midTa_청진	="11K10001";
const midTa_웅기_선봉 ="11K10002";
const midTa_성진_김책 ="11K10003";
const midTa_무산_삼지연 ="11K10004";
const midTa_함흥	="11K20001";
const midTa_장진	="11K20002";
const midTa_북청_신포 ="11K20003";
const midTa_혜산	="11K20004";
const midTa_풍산	="11K20005";
const midTa_원산	="11L10001";
const midTa_고성_장전 ="11L10002";
const midTa_평강	="11L10003";


export type MidTaAreaCode =typeof midTa_백령도|
                    typeof midTa_서울|
                    typeof midTa_과천|
                    typeof midTa_광명|
                    typeof midTa_강화|
                    typeof midTa_김포|
                    typeof midTa_인천|
                    typeof midTa_시흥|
                    typeof midTa_안산|
                    typeof midTa_부천|
                    typeof midTa_의정부|
                    typeof midTa_고양|
                    typeof midTa_양주|
                    typeof midTa_파주|
                    typeof midTa_동두천|
                    typeof midTa_연천|
                    typeof midTa_포천|
                    typeof midTa_가평|
                    typeof midTa_구리|
                    typeof midTa_남양주|
                    typeof midTa_양평|
                    typeof midTa_하남|
                    typeof midTa_수원|
                    typeof midTa_안양|
                    typeof midTa_오산|
                    typeof midTa_화성|
                    typeof midTa_성남|
                    typeof midTa_평택|
                    typeof midTa_의왕|
                    typeof midTa_군포|
                    typeof midTa_안성|
                    typeof midTa_용인|
                    typeof midTa_이천|
                    typeof midTa_광주_경기도|
                    typeof midTa_여주|
                    typeof midTa_충주|
                    typeof midTa_진천|
                    typeof midTa_음성|
                    typeof midTa_제천|
                    typeof midTa_단양|
                    typeof midTa_청주|
                    typeof midTa_보은|
                    typeof midTa_괴산|
                    typeof midTa_증평|
                    typeof midTa_추풍령|
                    typeof midTa_영동|
                    typeof midTa_옥천|
                    typeof midTa_서산|
                    typeof midTa_태안|
                    typeof midTa_당진|
                    typeof midTa_홍성|
                    typeof midTa_보령|
                    typeof midTa_서천|
                    typeof midTa_천안|
                    typeof midTa_아산|
                    typeof midTa_예산|
                    typeof midTa_대전|
                    typeof midTa_공주|
                    typeof midTa_계룡|
                    typeof midTa_세종|
                    typeof midTa_부여|
                    typeof midTa_청양|
                    typeof midTa_금산|
                    typeof midTa_논산|
                    typeof midTa_철원|
                    typeof midTa_화천|
                    typeof midTa_인제|
                    typeof midTa_양구|
                    typeof midTa_춘천|
                    typeof midTa_홍천|
                    typeof midTa_원주|
                    typeof midTa_횡성|
                    typeof midTa_영월|
                    typeof midTa_정선|
                    typeof midTa_평창|
                    typeof midTa_대관령|
                    typeof midTa_태백|
                    typeof midTa_속초|
                    typeof midTa_고성_강원도|
                    typeof midTa_양양|
                    typeof midTa_강릉|
                    typeof midTa_동해|
                    typeof midTa_삼척|
                    typeof midTa_울릉도|
                    typeof midTa_독도|
                    typeof midTa_전주|
                    typeof midTa_익산|
                    typeof midTa_정읍|
                    typeof midTa_완주|
                    typeof midTa_장수|
                    typeof midTa_무주|
                    typeof midTa_진안|
                    typeof midTa_남원|
                    typeof midTa_임실|
                    typeof midTa_순창|
                    typeof midTa_군산|
                    typeof midTa_김제|
                    typeof midTa_고창|
                    typeof midTa_부안|
                    typeof midTa_함평|
                    typeof midTa_영광|
                    typeof midTa_진도|
                    typeof midTa_완도|
                    typeof midTa_해남|
                    typeof midTa_강진|
                    typeof midTa_장흥|
                    typeof midTa_여수|
                    typeof midTa_광양|
                    typeof midTa_고흥|
                    typeof midTa_보성|
                    typeof midTa_순천시|
                    typeof midTa_광주|
                    typeof midTa_장성|
                    typeof midTa_나주|
                    typeof midTa_담양|
                    typeof midTa_화순|
                    typeof midTa_구례|
                    typeof midTa_곡성|
                    typeof midTa_순천|
                    typeof midTa_흑산도|
                    typeof midTa_목포|
                    typeof midTa_영암|
                    typeof midTa_신안|
                    typeof midTa_무안|
                    typeof midTa_성산|
                    typeof midTa_제주|
                    typeof midTa_성판악|
                    typeof midTa_서귀포|
                    typeof midTa_고산|
                    typeof midTa_이어도|
                    typeof midTa_추자도|
                    typeof midTa_울진|
                    typeof midTa_영덕|
                    typeof midTa_포항|
                    typeof midTa_경주|
                    typeof midTa_문경|
                    typeof midTa_상주|
                    typeof midTa_예천|
                    typeof midTa_영주|
                    typeof midTa_봉화|
                    typeof midTa_영양|
                    typeof midTa_안동|
                    typeof midTa_의성|
                    typeof midTa_청송|
                    typeof midTa_김천|
                    typeof midTa_구미|
                    typeof midTa_군위|
                    typeof midTa_고령|
                    typeof midTa_성주|
                    typeof midTa_대구|
                    typeof midTa_영천|
                    typeof midTa_경산|
                    typeof midTa_청도|
                    typeof midTa_칠곡|
                    typeof midTa_울산|
                    typeof midTa_양산|
                    typeof midTa_부산|
                    typeof midTa_창원|
                    typeof midTa_김해|
                    typeof midTa_통영|
                    typeof midTa_사천|
                    typeof midTa_거제|
                    typeof midTa_고성_경남|
                    typeof midTa_남해|
                    typeof midTa_함양|
                    typeof midTa_거창|
                    typeof midTa_합천|
                    typeof midTa_밀양|
                    typeof midTa_의령|
                    typeof midTa_함안|
                    typeof midTa_창녕|
                    typeof midTa_진주|
                    typeof midTa_산청|
                    typeof midTa_하동|
                    typeof midTa_사리원|
                    typeof midTa_신계|
                    typeof midTa_해주|
                    typeof midTa_개성|
                    typeof midTa_장연_용연|
                    typeof midTa_신의주|
                    typeof midTa_삭주_수풍|
                    typeof midTa_구성|
                    typeof midTa_자성_중강|
                    typeof midTa_강계|
                    typeof midTa_희천|
                    typeof midTa_평양|
                    typeof midTa_진남포_남포|
                    typeof midTa_안주|
                    typeof midTa_양덕|
                    typeof midTa_청진|
                    typeof midTa_웅기_선봉|
                    typeof midTa_성진_김책|
                    typeof midTa_무산_삼지연|
                    typeof midTa_함흥|
                    typeof midTa_장진|
                    typeof midTa_북청_신포|
                    typeof midTa_혜산|
                    typeof midTa_풍산|
                    typeof midTa_원산|
                    typeof midTa_고성_장전|
                    typeof midTa_평강;
                    export const midTaArea =[
                      "백령도",
                      "서울",
                      "과천",
                      "광명",
                      "강화",
                      "김포",
                      "인천",
                      "시흥",
                      "안산",
                      "부천",
                      "의정부",
                      "고양",
                      "양주",
                      "파주",
                      "동두천",
                      "연천",
                      "포천",
                      "가평",
                      "구리",
                      "남양주",
                      "양평",
                      "하남",
                      "수원",
                      "안양",
                      "오산",
                      "화성",
                      "성남",
                      "평택",
                      "의왕",
                      "군포",
                      "안성",
                      "용인",
                      "이천",
                      "광주(경기도)",
                      "여주",
                      "충주",
                      "진천",
                      "음성",
                      "제천",
                      "단양",
                      "청주",
                      "보은",
                      "괴산",
                      "증평",
                      "추풍령",
                      "영동",
                      "옥천",
                      "서산",
                      "태안",
                      "당진",
                      "홍성",
                      "보령",
                      "서천",
                      "천안",
                      "아산",
                      "예산",
                      "대전",
                      "공주",
                      "계룡",
                      "세종",
                      "부여",
                      "청양",
                      "금산",
                      "논산",
                      "철원",
                      "화천",
                      "인제",
                      "양구",
                      "춘천",
                      "홍천",
                      "원주",
                      "횡성",
                      "영월",
                      "정선",
                      "평창",
                      "대관령",
                      "태백",
                      "속초",
                      "고성(강원도)",
                      "양양",
                      "강릉",
                      "동해",
                      "삼척",
                      "울릉도",
                      "독도",
                      "전주",
                      "익산",
                      "정읍",
                      "완주",
                      "장수",
                      "무주",
                      "진안",
                      "남원",
                      "임실",
                      "순창",
                      "군산",
                      "김제",
                      "고창",
                      "부안",
                      "함평",
                      "영광",
                      "진도",
                      "완도",
                      "해남",
                      "강진",
                      "장흥",
                      "여수",
                      "광양",
                      "고흥",
                      "보성",
                      "순천시",
                      "광주",
                      "장성",
                      "나주",
                      "담양",
                      "화순",
                      "구례",
                      "곡성",
                      "순천",
                      "흑산도",
                      "목포",
                      "영암",
                      "신안",
                      "무안",
                      "성산",
                      "제주",
                      "성판악",
                      "서귀포",
                      "고산",
                      "이어도",
                      "추자도",
                      "울진",
                      "영덕",
                      "포항",
                      "경주",
                      "문경",
                      "상주",
                      "예천",
                      "영주",
                      "봉화",
                      "영양",
                      "안동",
                      "의성",
                      "청송",
                      "김천",
                      "구미",
                      "군위",
                      "고령",
                      "성주",
                      "대구",
                      "영천",
                      "경산",
                      "청도",
                      "칠곡",
                      "울산",
                      "양산",
                      "부산",
                      "창원",
                      "김해",
                      "통영",
                      "사천",
                      "거제",
                      "고성(경남)",
                      "남해",
                      "함양",
                      "거창",
                      "합천",
                      "밀양",
                      "의령",
                      "함안",
                      "창녕",
                      "진주",
                      "산청",
                      "하동",
                      "사리원",
                      "신계",
                      "해주",
                      "개성",
                      "장연(용연)",
                      "신의주",
                      "삭주(수풍)",
                      "구성",
                      "자성(중강)",
                      "강계",
                      "희천",
                      "평양",
                      "진남포(남포)",
                      "안주",
                      "양덕",
                      "청진",
                      "웅기(선봉)",
                      "성진(김책)",
                      "무산(삼지연)",
                      "함흥",
                      "장진",
                      "북청(신포)",
                      "혜산",
                      "풍산",
                      "원산",
                      "고성(장전)",
                      "평강"
                      ];
export const midTaAreaCode :MidTaAreaCode[]  =  ["11A00101",
  "11B10101",
  "11B10102",
  "11B10103",
  "11B20101",
  "11B20102",
  "11B20201",
  "11B20202",
  "11B20203",
  "11B20204",
  "11B20301",
  "11B20302",
  "11B20304",
  "11B20305",
  "11B20401",
  "11B20402",
  "11B20403",
  "11B20404",
  "11B20501",
  "11B20502",
  "11B20503",
  "11B20504",
  "11B20601",
  "11B20602",
  "11B20603",
  "11B20604",
  "11B20605",
  "11B20606",
  "11B20609",
  "11B20610",
  "11B20611",
  "11B20612",
  "11B20701",
  "11B20702",
  "11B20703",
  "11C10101",
  "11C10102",
  "11C10103",
  "11C10201",
  "11C10202",
  "11C10301",
  "11C10302",
  "11C10303",
  "11C10304",
  "11C10401",
  "11C10402",
  "11C10403",
  "11C20101",
  "11C20102",
  "11C20103",
  "11C20104",
  "11C20201",
  "11C20202",
  "11C20301",
  "11C20302",
  "11C20303",
  "11C20401",
  "11C20402",
  "11C20403",
  "11C20404",
  "11C20501",
  "11C20502",
  "11C20601",
  "11C20602",
  "11D10101",
  "11D10102",
  "11D10201",
  "11D10202",
  "11D10301",
  "11D10302",
  "11D10401",
  "11D10402",
  "11D10501",
  "11D10502",
  "11D10503",
  "11D20201",
  "11D20301",
  "11D20401",
  "11D20402",
  "11D20403",
  "11D20501",
  "11D20601",
  "11D20602",
  "1.10E+102",
  "1.10E+103",
  "11F10201",
  "11F10202",
  "11F10203",
  "11F10204",
  "11F10301",
  "11F10302",
  "11F10303",
  "11F10401",
  "11F10402",
  "11F10403",
  "21F10501",
  "21F10502",
  "21F10601",
  "21F10602",
  "21F20101",
  "21F20102",
  "21F20201",
  "11F20301",
  "11F20302",
  "11F20303",
  "11F20304",
  "11F20401",
  "11F20402",
  "11F20403",
  "11F20404",
  "11F20405",
  "11F20501",
  "11F20502",
  "11F20503",
  "11F20504",
  "11F20505",
  "11F20601",
  "11F20602",
  "11F20603",
  "11F20701",
  "21F20801",
  "21F20802",
  "21F20803",
  "21F20804",
  "11G00101",
  "11G00201",
  "11G00302",
  "11G00401",
  "11G00501",
  "11G00601",
  "11G00800",
  "11H10101",
  "11H10102",
  "11H10201",
  "11H10202",
  "11H10301",
  "11H10302",
  "11H10303",
  "11H10401",
  "11H10402",
  "11H10403",
  "11H10501",
  "11H10502",
  "11H10503",
  "11H10601",
  "11H10602",
  "11H10603",
  "11H10604",
  "11H10605",
  "11H10701",
  "11H10702",
  "11H10703",
  "11H10704",
  "11H10705",
  "11H20101",
  "11H20102",
  "11H20201",
  "11H20301",
  "11H20304",
  "11H20401",
  "11H20402",
  "11H20403",
  "11H20404",
  "11H20405",
  "11H20501",
  "11H20502",
  "11H20503",
  "11H20601",
  "11H20602",
  "11H20603",
  "11H20604",
  "11H20701",
  "11H20703",
  "11H20704",
  "11I10001",
  "11I10002",
  "11I20001",
  "11I20002",
  "11I20003",
  "11J10001",
  "11J10002",
  "11J10003",
  "11J10004",
  "11J10005",
  "11J10006",
  "11J20001",
  "11J20002",
  "11J20004",
  "11J20005",
  "11K10001",
  "11K10002",
  "11K10003",
  "11K10004",
  "11K20001",
  "11K20002",
  "11K20003",
  "11K20004",
  "11K20005",
  "11L10001",
  "11L10002",
  "11L10003",
  ];

const api_서울 ="서울"; 
const api_부산 ="부산"; 
const api_대구 ="대구"; 
const api_인천 ="인천"; 
const api_광주 ="광주"; 
const api_대전 ="대전"; 
const api_울산 ="울산"; 
const api_경기 ="경기"; 
const api_강원 ="강원"; 
const api_충북 ="충북"; 
const api_충난 ="충남"; 
const api_전북 ="전북"; 
const api_전남 ="전남"; 
const api_경북 ="경북"; 
const api_경남 ="경남";
const api_제주 ="제주";
const api_세종 ="세종";

export type ApiAreaCode = typeof api_서울| 
                          typeof api_부산| 
                          typeof api_대구| 
                          typeof api_인천| 
                          typeof api_광주| 
                          typeof api_대전| 
                          typeof api_울산| 
                          typeof api_경기| 
                          typeof api_강원| 
                          typeof api_충북| 
                          typeof api_충난| 
                          typeof api_전북| 
                          typeof api_전남| 
                          typeof api_경북| 
                          typeof api_경남|
                          typeof api_제주|
                          typeof api_세종;

const 경기북부 ="경기북부";
const 경기남부 ="경기남부";
const 영서="영서";
const 영동 ="영동";
export type ApFcstAreaCode = ApiAreaCode | 
                            typeof 경기북부|
                            typeof 경기남부|
                            typeof 영서|
                            typeof 영동;
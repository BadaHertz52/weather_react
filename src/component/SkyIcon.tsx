import React from 'react';
import { SkyType } from '../modules/weather';
import {BsCloudyFill, BsFillCloudRainFill,  BsMoonStarsFill, BsSnow2 ,BsFillSunFill, BsSunFill} from 'react-icons/bs';
import {FaCloudShowersHeavy} from 'react-icons/fa';
type SkyIconProperty ={
  skyType:SkyType,
  daytime:boolean
};
type WeatherIconProperty ={
  className:string |undefined
};
type CloudyPorperty = WeatherIconProperty & {
  rain:boolean,
  shower:boolean
}
export const CloudyIcon =({className , rain ,shower}:CloudyPorperty)=>{
  return(
    <div className= {`${className} cloudyIcon weatherIcon`}>
      <svg width="0" height="0">
        <linearGradient id="cloudy_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop  stopColor="#ececec" offset="10%" />
          <stop  stopColor="#c5c5c5" offset="100%" />
        </linearGradient>
      </svg>
      <div className="iconWrap" style={{ fill: "url(#cloudy_gradient)" }} >
      {
        rain ?
          <BsFillCloudRainFill  />
        :
        (shower ?
          <FaCloudShowersHeavy />
          
          :
          <BsCloudyFill/>
        )
        
      }
      </div>
      
    </div>
  )
};
export const VeryCloudyIcon =({className , rain ,shower}:CloudyPorperty)=>{
  return(
    <div className={`${className} veryCloudyIcon weatherIcon`} >
      <svg width="0" height="0">
        <linearGradient id="veryCloudy_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop  stopColor="#c4c2c2" offset="10%" />
          <stop  stopColor="#7a7a7a" offset="100%" />
        </linearGradient>
      </svg>
      <div className="iconWrap" style={{ fill: "url(#veryCloudy_gradient)" }} >
      {rain ?
          <BsFillCloudRainFill />
        :
        (shower ?
          <FaCloudShowersHeavy />
          
          :
          <BsCloudyFill/>
        )
      }
      </div>
      
    </div>
  )
};
export const SnowIcon =({className}:WeatherIconProperty)=>{
  return(
  <div className={`snowIcon weatherIcon ${className}`}>
      <svg width="0" height="0">
        <linearGradient id="snow_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop  stopColor="#a7e7fb" offset="5%" />
          <stop  stopColor="#019cef" offset="100%" />
        </linearGradient>
      </svg>
      <div className= "iconWrap"  style={{ fill: "url(#snow_gradient)" }} >
          <BsSnow2/>
      </div>
    </div>
  )
};
export const SunnyDayIcon =()=>{
  return(
    <div className='sunnyDayIcon weatherIcon'>
        <svg width="0" height="0">
          <linearGradient id="sunnyDay_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop  stopColor="#fae85d" offset="20%" />
            <stop  stopColor="#ff9500" offset="100%" />
          </linearGradient>
        </svg>
        <div className='iconWrap' style={{ fill: "url(#sunnyDay_gradient)" }}  >
            <BsSunFill/>
        </div>
      </div>
  )
};

export const SunnyNightIcon =()=>{
  return(
    <div className='sunnyNightIcon weatherIcon'>
        <svg width="0" height="0">
          <linearGradient id="sunnyDay_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop  stopColor="#fff2af" offset="10%" />
            <stop  stopColor="#ffd500" offset="100%" />
          </linearGradient>
        </svg>
        <div className='iconWrap' style={{ fill: "url(#sunnyDay_gradient)" }}  >
            <BsMoonStarsFill/>
        </div>
      </div>
    )
};

const SkyIcon =({skyType ,daytime}:SkyIconProperty)=>{
  return (
    <div className='skyIcon'>
      {skyType ==="구름많고 눈" &&
        <div className="overlapping">
          <CloudyIcon
            className='behind'
            rain={false}
            shower={false}
          />
          <SnowIcon
            className='front'
          />
        </div>
      }
      {skyType ==="구름많고 비" &&
        <CloudyIcon
          className='behind'
          rain={true}
          shower={false}
        />
      }
      {skyType ==="구름많고 비/눈" &&
        <div className="overlapping">
          <CloudyIcon
            className='behind'
            rain={true}
            shower={false}
          />
          <SnowIcon className='front'/>
        </div>
      }
      {(skyType ==="소나기" ||
        skyType ==="한때 비" ||
        skyType ==="구름많고 소나기"
      ) &&
        <CloudyIcon
          className=''
          rain={false}
          shower={true}
        />
      }
      {skyType ==="구름많음" &&
        <CloudyIcon
          className=''
          rain={false}
          shower={false}
        />
      }
      {skyType === "눈"&&
        <SnowIcon className='' />
      }
      {skyType ==="맑음" &&
        (daytime ?
          <SunnyDayIcon/>
        :
          <SunnyNightIcon/>
        )
        
      }
      { skyType ==="흐리고 눈" &&
        <div className="overlapping">
          <VeryCloudyIcon 
            className ={"behind"}
            rain={false}
            shower={false}
          />
          <SnowIcon className='front'/>
        </div>
      }
      { (skyType ==="비" ||
        skyType ==="흐리고 비") &&
        <VeryCloudyIcon 
          className ={undefined}
          rain={true}
          shower={false}
        />
      }
      { (skyType ==="비 또는 눈" ||
        skyType ==="흐리고 비/눈") &&
        <div className="overlapping">
          <VeryCloudyIcon 
            className ={"behind"}
            rain={true}
            shower={false}
          />
          <SnowIcon className='front'/>
        </div>
      }
      { skyType ==="흐리고 소나기" &&
        <VeryCloudyIcon
          className={undefined}
          rain={false}
          shower={true}
        />
      } 
      { skyType ==="흐림" &&
        <VeryCloudyIcon
          className={undefined}
          rain={false}
          shower={false}
        />
      }
    </div>
  )
};

export default React.memo(SkyIcon)
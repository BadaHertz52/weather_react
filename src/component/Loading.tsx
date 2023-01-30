import React , {useState} from 'react';
import { DataState } from '../modules/weather';

import {BiError} from 'react-icons/bi';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {CgSmile} from 'react-icons/cg';
import {HiOutlineChatBubbleOvalLeftEllipsis} from 'react-icons/hi2';
const position ="position";
const weather ="weather";
type LoadingStateProperty ={
  data:typeof position| typeof weather,
  state:DataState
}
const LoadingState =({data, state}:LoadingStateProperty)=>{
  return (
    <div className={`loading_state ${state === "none" ? "state_none": state}`}>
      <div className="icon">
        {state ==="pending" &&
          <div className="pendingIcon">
            <svg width="0" height="0">
              <linearGradient id="pending_gradient" x1="0%" y1="50%" 
              x2="50%" y2="50%" >
                <stop  stopColor="#7fbca5" offset="30%" />
                <stop  stopColor="#0b5338" offset="100%" />
              </linearGradient>
            </svg>
            <div    className="icon_wrap"
              style={{ fill: "url(#pending_gradient)" }}
            >
              <AiOutlineLoading3Quarters/>
            </div>
            
          </div>
        }
        {state ==="failure" &&
            <BiError/>
        }
        {state ==="none" &&
              <HiOutlineChatBubbleOvalLeftEllipsis/>
        }
        {state === "success" &&
            <CgSmile/>
        }
      </div>
      <div className="data">
        <span>
          {data}
        </span>
        <span>
          :
        </span>
      </div>
      <div className="state">
        {state === "none"? 
          "ready"
          :
          state
        }
      </div>
    </div>
  )
}
type LoadingProperty ={
  positionState :DataState,
  weatherState: DataState
}
const Loading =({positionState
, weatherState}:LoadingProperty)=>{
  const getProgress=(state:DataState)=>{
    switch (state) {
      case "none":
        return 0;
      case "pending":
        return 25;
      case "success":
        return 50;
      case "failure":
        return 50;
      default:
        return 0;
    }
  };

  const progress = getProgress(positionState)  + getProgress(weatherState);

  return(
  <div id="loading">
    <div className="inner">
      <div className="state_area">
        <LoadingState
          data={position}
          state ={positionState}
        />
        <LoadingState
          data={weather}
          state ={weatherState}
        />
      </div>
      <div className="loading_area">
        <div className={`bar_wrap progress_${progress}`}>
          <div className="bar_state">
            {progress === 100? 
              (positionState === "failure" ||
              weatherState ==="failure")
              ?
              "failure..."
              :
              "success!!"
              :
              "loading..."
            }
          </div>
          <div className="bar">
              
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

export default React.memo(Loading);
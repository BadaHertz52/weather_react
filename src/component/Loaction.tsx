import { AnyAction } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import { RootState } from '../modules';
import { CurrentPosition, getPositionThunk, PositionAction, PositionState, PositionSuccessData, toolkitPosition } from '../modules/position';
import { positionSlice } from '../modules/position/reducer';
import { WeatherState } from '../modules/weather';
import { weatherSlice } from '../modules/weather/reducer';
 

const StyledBtn =styled.button`
  width: 100px;
  box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ebebeb 25%, #dad9d9e9 100%);
	background-color:#ededed;
	border-radius:6px;
	border:1px solid #cacaca;
	display:inline-block;
	cursor:pointer;
	font-size:14px;
	padding:6px 24px;
	text-decoration:none;
  &:hover {
    background:linear-gradient(to bottom, #c6c5c5e9 ,25%,  #ebebeb 100%);
	  background-color:#c6c5c5e9 ;
  }
`;

type LocationProperty ={
  startThunk: React.MutableRefObject<boolean>,
  startSaga: React.MutableRefObject<boolean>,
  startToolkit: React.MutableRefObject<boolean>
  positionThunkDispatch: ThunkDispatch<PositionState, unknown, PositionAction>,
  toolkitDispatch: ThunkDispatch<PositionState | WeatherState, CurrentPosition | PositionSuccessData, AnyAction>

}
const Loation =({
  startThunk,startSaga,startToolkit , positionThunkDispatch, toolkitDispatch
}:LocationProperty)=>{
  const position =useSelector((state:RootState)=> state.positionReducer);
  const positionActions = positionSlice.actions;
  const weatherActions =weatherSlice.actions;

  const dispatch =useDispatch();

  const thunk ="thunk" ;
  const saga ="saga";
  const toolkit="toolkit";

  type Middleware = typeof thunk | typeof saga | typeof toolkit; 

  function dispatchAction (middleware:Middleware){
    position.state !=="none" &&
    dispatch(positionActions.reset());
    position.state !=="none" && dispatch(weatherActions.reset()) ;

    navigator.geolocation.getCurrentPosition((pos:GeolocationPosition)=>{
      const latitude =JSON.stringify(pos.coords.latitude) ;
      const longitude =JSON.stringify(pos.coords.longitude);
      const currentPosition :CurrentPosition ={
        longitude: longitude,
        latitude: latitude
      }
      try{
        if(middleware === thunk){
          startThunk.current = true; 
          positionThunkDispatch(getPositionThunk(currentPosition))
        }else if(middleware=== saga){
          startSaga.current = true;
          dispatch(positionActions.request(currentPosition));
        }else{
          startToolkit.current =true;
          toolkitDispatch(toolkitPosition(currentPosition));
        }
      }catch(error){
        const e =new Error (`can't find sfGrid`)
        dispatch(positionActions.failure(e));
      }
    },(error)=>{
      const e =new Error (`can't find currentPostion`)
      dispatch(positionActions.failure(e));
    });
  };
  function onClickThunk(){
    dispatchAction(thunk)
  };  

  function onClickSaga (){
    dispatchAction(saga)
  };

  function onClickToolkitThunk (){
    dispatchAction(toolkit);
  };

  return (
    <div className="location">
      <div className="loaction_area">
        {position.sfGrid !==null ?
          ( position.sfGrid.arePt2 !== null ?
              position.sfGrid.arePt3 !==null?
                `${position.sfGrid.arePt2}
                
                ${position.sfGrid.arePt3}`
              :
              position.sfGrid.arePt2
            :
            position.sfGrid.arePt1 
          )
        : "위치 정보 없음"
        }
      </div>
      <div className="location_dropdown">
        <div className="dropBtn">
          dropdown
        </div>
        <div className="dropdown-content">
          <div className="header">
          Select the method to get weather information.
          </div>
          <div className="btns">
            <StyledBtn 
              className='toolkitBtn'
              onClick={onClickToolkitThunk}
              title="use redux-toolkit"
            >
              toolkit
            </StyledBtn>
            <StyledBtn 
              className='thunkBtn'
              onClick={onClickThunk}
              title="use redux-thunk"
            >
              thunk
            </StyledBtn>
            <StyledBtn
              className='sagaBtn'
              onClick ={onClickSaga}
              title="use redux-saga"
            >
              saga
            </StyledBtn>
          </div>

        </div>
      </div>
    </div>
  )
};

export default React.memo(Loation)
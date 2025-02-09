import React from "react";
import LocationBtn from "./LocationBtn";
import {
  MdLocationDisabled,
  MdLocationSearching,
  MdMyLocation,
  MdShareLocation,
} from "react-icons/md";
import { PositionState, RootState } from "../../modules";
import { useSelector } from "react-redux";

type DropDownProperty = {
  position: PositionState;
  dispatchAction: (middleware: "thunk" | "saga" | "toolkit") => void;
};

const DropDown = ({ dispatchAction, position }: DropDownProperty) => {
  const weather = useSelector((state: RootState) => state.weatherReducer);

  const isButtonDisabled =
    position.state === "pending" || weather.state === "pending";

  // const onClickThunk = () => {
  //   dispatchAction("thunk");
  // };
  // const onClickSaga = () => {
  //   dispatchAction("saga");
  // };
  // const onClickToolkitThunk = () => {
  //   dispatchAction("toolkit");
  // };

  const handleClickButton = () => {
    dispatchAction("toolkit");
  };

  return (
    <div className="location_dropdown">
      <button
        className="dropBtn"
        disabled={isButtonDisabled}
        onClick={handleClickButton}
      >
        {position.state === "none" && <MdLocationSearching />}
        {position.state === "pending" && <MdShareLocation />}
        {position.state === "success" && <MdMyLocation />}
        {position.state === "failure" && <MdLocationDisabled />}
      </button>
      {/* <div className="dropdown-content">
        <div className="header">
          <p>어떤 방식으로 날씨 정보를 불러올까요?</p>
          <br />
          <p>원하는 방식을 선택해주세요.</p>
        </div>
        <div className="btn-group">
          <LocationBtn
            className="toolkitBtn"
            onClick={onClickToolkitThunk}
            title="use redux-toolkit"
            disabled={isDisabled}
          >
            toolkit
          </LocationBtn>
          <LocationBtn
            className="thunkBtn"
            onClick={onClickThunk}
            title="use redux-thunk"
            disabled={isDisabled}
          >
            thunk
          </LocationBtn>
          <LocationBtn
            className="sagaBtn"
            onClick={onClickSaga}
            title="use redux-saga"
            disabled={isDisabled}
          >
            saga
          </LocationBtn>
        </div>
      </div> */}
    </div>
  );
};

export default React.memo(DropDown);

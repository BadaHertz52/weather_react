import React from "react";
import LocationBtn from "./LocationBtn";
import {
  MdLocationDisabled,
  MdLocationSearching,
  MdMyLocation,
  MdShareLocation,
} from "react-icons/md";
import { PositionState } from "../../modules";

type DropDownProperty = {
  position: PositionState;
  dispatchAction: (middleware: "thunk" | "saga" | "toolkit") => void;
};

const DropDown = ({ dispatchAction, position }: DropDownProperty) => {
  const onClickThunk = () => {
    dispatchAction("thunk");
  };
  const onClickSaga = () => {
    dispatchAction("saga");
  };
  const onClickToolkitThunk = () => {
    dispatchAction("toolkit");
  };

  return (
    <div className="location_dropdown">
      <div className="dropBtn">
        {position.state === "none" && <MdLocationSearching />}
        {position.state === "pending" && <MdShareLocation />}
        {position.state === "success" && <MdMyLocation />}
        {position.state === "failure" && <MdLocationDisabled />}
      </div>
      <div className="dropdown-content">
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
          >
            toolkit
          </LocationBtn>
          <LocationBtn
            className="thunkBtn"
            onClick={onClickThunk}
            title="use redux-thunk"
          >
            thunk
          </LocationBtn>
          <LocationBtn
            className="sagaBtn"
            onClick={onClickSaga}
            title="use redux-saga"
          >
            saga
          </LocationBtn>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DropDown);

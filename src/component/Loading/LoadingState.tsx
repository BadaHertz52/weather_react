import React from "react";
import { DataState } from "../../modules";
import { BiError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgSmile } from "react-icons/cg";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

type LoadingStateProperty = {
  data: "position" | "weather";
  state: DataState;
};
const LoadingState = ({ data, state }: LoadingStateProperty) => {
  return (
    <div className={`loading_state ${state === "none" ? "state_none" : state}`}>
      <div className="icon">
        {state === "pending" && (
          <div className="pendingIcon">
            <svg width="0" height="0">
              <linearGradient
                id="pending_gradient"
                x1="0%"
                y1="50%"
                x2="50%"
                y2="50%"
              >
                <stop stopColor="#7fbca5" offset="30%" />
                <stop stopColor="#0b5338" offset="100%" />
              </linearGradient>
            </svg>
            <div
              className="icon_wrap"
              style={{ fill: "url(#pending_gradient)" }}
            >
              <AiOutlineLoading3Quarters />
            </div>
          </div>
        )}
        {state === "failure" && <BiError />}
        {state === "none" && <HiOutlineChatBubbleOvalLeftEllipsis />}
        {state === "success" && <CgSmile />}
      </div>
      <div className="data">
        <span>{data}</span>
        <span>:</span>
      </div>
      <div className="state">
        {state === "none" ? "ready" : state === "pending" ? "loading" : state}
      </div>
    </div>
  );
};

export default React.memo(LoadingState);

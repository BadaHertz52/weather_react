import React from "react";

type ThProperty = {
  title: string;
  unit: string;
};
const Th = ({ title, unit }: ThProperty) => {
  return (
    <th scope="row" className="data heading">
      <div className="tit">
        <em>{title}</em>
        <div className="unit">({unit})</div>
      </div>
    </th>
  );
};

export default React.memo(Th);

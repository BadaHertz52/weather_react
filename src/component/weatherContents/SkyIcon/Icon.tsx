import React, { SVGAttributes, ReactNode } from "react";

export type IconProperty = {
  sky: "cloudy" | "veryCloudy" | "snow" | "sunnyDay" | "sunnyNight";
  className?: string;
  firstStopProperty: SVGAttributes<SVGStopElement>;
  secondStopProperty: SVGAttributes<SVGStopElement>;
  children: ReactNode;
};

const Icon = ({
  sky,
  className,
  firstStopProperty,
  secondStopProperty,
  children,
}: IconProperty) => {
  const id = `${sky}_gradient`;
  const fill = `url(#${id})`;

  return (
    <div className={`${className} ${sky}Icon weatherIcon`}>
      <svg width="0" height="0">
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop {...firstStopProperty} />
          <stop {...secondStopProperty} />
        </linearGradient>
      </svg>
      <div className="iconWrap" style={{ fill: fill }}>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Icon);

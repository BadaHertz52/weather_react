import { WIND_DIRECTION_ARRAY } from "../../constants";
import { WindDirectionType } from "../weather";

export const getWsd = (wsd: string, vec: number): WindDirectionType => {
  const cv = Math.floor((Number(wsd) + vec * 0.5) / 22.5);
  const direction = WIND_DIRECTION_ARRAY[cv];

  return direction;
};

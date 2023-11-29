import { PmType } from "../modules";
import { TableHeadDataValueType, TableHeadTitleType } from "../types";
import { getTableHeadDataValue } from "../utils";
import { PM_STATE } from "./weather";

export const GRADE_ARRAY: PmType[] = Object.keys(PM_STATE) as PmType[];

export const GRAPH_TABLE_HEAD_MAP: Map<
  TableHeadTitleType,
  TableHeadDataValueType
> = new Map([
  ["pop", getTableHeadDataValue("강수확률", "%")],
  ["pcp", getTableHeadDataValue("강수", "mm")],
  ["sno", getTableHeadDataValue("적설", "cm")],
  ["windy", getTableHeadDataValue("바람", "m/s")],
  ["reh", getTableHeadDataValue("습도", "%")],
]);

export const GRAPH_TABLE_HEAD_ARRAY = Array.from(GRAPH_TABLE_HEAD_MAP.keys());

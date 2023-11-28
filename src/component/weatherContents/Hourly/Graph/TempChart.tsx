import React from "react";
import { CSSProperties } from "styled-components";
import { DailyWeather, HourWeather } from "../../../../modules";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  registerables as registerablesJS,
} from "chart.js";
import TempValue from "./TempValue";

ChartJS.register(...registerablesJS);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type TempChartProperty = {
  threeDay: DailyWeather[];
};

const TempChart = ({ threeDay }: TempChartProperty) => {
  const tempArray = threeDay.map((d: DailyWeather) =>
    d.hourly.map((h: HourWeather) => h.temp)
  );
  const todayTempArray = tempArray[0];
  const tomorrowTempArray = tempArray[1];
  const dayAfterTempArray = tempArray[2];
  const temps = [...todayTempArray, ...tomorrowTempArray, ...dayAfterTempArray];
  const maxY = Math.max(...temps) + 8;
  const minY = Math.min(...temps) - 8;
  const chartData = getChartData(temps);
  const chartStyle: CSSProperties = {
    width: "inherit",
    height: "inherit",
    position: "absolute",
    left: "calc(40px * 0.5)",
  };
  const chartOption: ChartOptions = {
    responsive: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        axis: "x",
        display: false,
        title: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        axis: "y",
        display: false,
        title: {
          display: false,
        },
        max: maxY,
        min: minY,
      },
    },
  };

  function getChartData(tempArray: number[]): ChartData {
    // 오늘에서부터 나오는 그래프 선을 위해
    const array = [todayTempArray[0], ...tempArray];
    const chartData: ChartData = {
      labels: array,
      datasets: [
        {
          data: array,
          borderColor: "#333333",
          borderWidth: 1,
          spanGaps: true,
        },
      ],
    };
    return chartData;
  }

  return (
    <tr>
      <td id="tempChart" className="chart">
        <div className="chart chart_area">
          <Chart
            className="chart_line"
            type="line"
            data={chartData}
            options={chartOption}
            style={chartStyle}
          />
          <div className="chart_text">
            {temps.map((t: number) => (
              <TempValue minY={minY} maxY={maxY} temp={t} />
            ))}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(TempChart);

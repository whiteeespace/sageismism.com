"use client";

import React from "react";

import styles from "./styles.module.scss";

interface SizeChartProps {
  sizeChartData: {
    size: string;
    chart: {
      [key: string]: {
        inch: number;
        cm: number;
      };
    };
  }[];
}

export const SizeChart: React.FC<SizeChartProps> = ({ sizeChartData }) => {
  if (!sizeChartData || sizeChartData.length === 0) {
    return null;
  }

  return (
    <div className={styles["size-chart-container"]}>
      <table className={styles["size-chart"]}>
        <thead>
          <tr>
            <th>Size</th>
            {Object.keys(sizeChartData[0].chart).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeChartData.map((size, index) => (
            <tr key={index}>
              <td>{size.size}</td>
              {Object.entries(size.chart).map(([key, value]) => (
                <td key={key}>
                  {value.inch}&quot; / {value.cm} cm
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

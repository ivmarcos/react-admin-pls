import React, { Component } from "react";
import PropTypes from "prop-types";
import ECharts from "../common/ECharts";

const options = {
  title: {
    text: "ECharts entry example"
  },
  tooltip: {},
  legend: {
    data: ["Sales"]
  },
  xAxis: {
    data: ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
  },
  yAxis: {},
  series: [
    {
      name: "Sales",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};

const CategoriaChart = () => (
  <div>
    <ECharts options={options} />
  </div>
);

CategoriaChart.propTypes = {};

export default CategoriaChart;

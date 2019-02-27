import React from "react";
import compose from "recompose/compose";
import { withTheme } from "@material-ui/core/styles";
import { withSize } from "react-sizeme";

const data = [
  {
    id: "whisky",
    color: "hsl(300, 70%, 50%)",
    data: [
      {
        color: "hsl(19, 70%, 50%)",
        x: "ZW",
        y: 19
      },
      {
        color: "hsl(11, 70%, 50%)",
        x: "AT",
        y: 20
      },
      {
        color: "hsl(286, 70%, 50%)",
        x: "DZ",
        y: 48
      },
      {
        color: "hsl(5, 70%, 50%)",
        x: "IE",
        y: 21
      },
      {
        color: "hsl(204, 70%, 50%)",
        x: "MT",
        y: 53
      },
      {
        color: "hsl(80, 70%, 50%)",
        x: "BF",
        y: 1
      },
      {
        color: "hsl(317, 70%, 50%)",
        x: "FI",
        y: 5
      },
      {
        color: "hsl(241, 70%, 50%)",
        x: "SE",
        y: 48
      },
      {
        color: "hsl(339, 70%, 50%)",
        x: "AZ",
        y: 10
      }
    ]
  }
];

const theme = {
  axis: {
    textColor: "#eee",
    fontSize: "14px",
    tickColor: "#eee"
  },
  grid: {
    stroke: "#888",
    strokeWidth: 1
  }
};

//usar stateless component
class CLine extends React.Component {
  render() {
    return (
      <div>
        <h2>Line Example</h2>
      </div>
    );
  }
}

export default compose(
  withSize(),
  withTheme()
)(CLine);

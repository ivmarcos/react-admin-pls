import React, { Component } from "react";
import compose from "recompose/compose";
import { Bar } from "@nivo/bar";
import { withTheme } from "@material-ui/core/styles";
import { withSize } from "react-sizeme";

import CustomCircularProgress from "../CircularProgress";

//usar stateless component
class CBar extends Component {
  render() {
    const { size, title, loading, data, indexBy, keys } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        {loading && <CustomCircularProgress />}
        {!loading && data && (
          <Bar
            height={400}
            width={size.width}
            margin={{
              top: 30,
              right: 40,
              bottom: 30,
              left: 40
            }}
            data={data}
            indexBy={indexBy}
            keys={keys}
            padding={0.2}
            labelTextColor="inherit:darker(1)"
            labelSkipWidth={16}
            labelSkipHeight={16}
            theme={{
              axis: {
                textColor: "#eee",
                fontSize: "14px",
                tickColor: "#eee"
              },
              grid: {
                stroke: "#888",
                strokeWidth: 1
              }
            }}
          />
        )}
      </div>
    );
  }
}

export default compose(
  withSize(),
  withTheme()
)(CBar);

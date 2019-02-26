import React, { Component } from "react";
import PropTypes from "prop-types";
import echarts from "echarts";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";

const styles = {
  container: {
    width: "100%",
    height: 400
  }
};

/**
 * Wrapper do echarts para integração dos components
 */
class ECharts extends Component {
  ref = React.createRef();

  componentDidMount() {
    this.chart = echarts.init(this.ref.current);
    if (this.props.options) {
      this.chart.setOption(this.props.options);
    }
  }
  componentDidUpdate(prevProps) {
    const { options } = this.props;
    if (options !== prevProps.options) {
      this.chart.setOption(options);
    }
  }

  render() {
    const { className, classes, style } = this.props;
    return (
      <div
        ref={this.ref}
        className={classNames(classes.container, className)}
        style={style}
      />
    );
  }
}

ECharts.propTypes = {
  className: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
};

export default withStyles(styles)(ECharts);

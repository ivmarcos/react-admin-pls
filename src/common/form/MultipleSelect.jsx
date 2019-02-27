import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

import DateRangePicker from "./DateRangePicker";

import { data } from "../../configuration/authProvider";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import moment from "moment";

const styles = theme => ({
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  margin: {
    "margin-top": theme.spacing.unit,
    "margin-bottom": theme.spacing.unit
  },
  marginL: {
    "margin-left": theme.spacing.unit
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  };
}

class MultipleSelect extends React.Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,

    startDate1: null,
    endDate1: null,
    focusedInput1: null,

    startDate2: null,
    endDate2: null,
    focusedInput2: null,

    startDate3: null,
    endDate3: null,
    focusedInput3: null,

    comparaLoja: false,
    comparaPeriodo: false,

    name: [data.loja.nome_fantasia]
  };

  handleSwitch = name => event => {
    if (event.target.checked) {
      var outro = name === "comparaPeriodo" ? "comparaLoja" : "comparaPeriodo";
      this.setState({ [name]: event.target.checked, [outro]: false });
    } else {
      this.setState({ [name]: event.target.checked });
    }
  };

  handleSelect = event => {
    this.setState({ name: event.target.value });
  };

  getDate(moment, start) {
    if (start) moment.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    else moment.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });

    return moment.toDate();
  }

  stateToFilter() {
    const {loja}= data;
    if (this.state.comparaLoja) {
    }

    if (this.state.comparaPeriodo) {
    }

    return {
      lojaId: loja.id,
      dt_hr_it: {
        between: [
          this.getDate(this.state.startDate, true),
          this.getDate(this.state.endDate, false)
        ]
      }
    };
  }

  render() {
    const { classes, handlePesquisar } = this.props;
    const {loja, user} = data;

    return (
      <div>
        <FormGroup row className={classes.margin}>
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => {
              this.setState({ startDate, endDate });
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => {
              this.setState({ focusedInput });
            }}
          />
          <FormControlLabel
            className={classes.marginL}
            control={
              <Switch
                disabled={user.lojas.length === 1}
                checked={this.state.comparaLoja}
                onChange={this.handleSwitch("comparaLoja")}
              />
            }
            label="Compara Lojas"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.comparaPeriodo}
                onChange={this.handleSwitch("comparaPeriodo")}
              />
            }
            label="Compara Periodos"
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => handlePesquisar(this.stateToFilter())}
          >
            Pesquisar
          </Button>
        </FormGroup>
        {this.state.comparaLoja && (
          <Select
            className={classes.margin}
            multiple
            value={this.state.name}
            onChange={this.handleSelect}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {user.lojas.map(l => (
              <MenuItem
                key={l.id}
                value={l.nome_fantasia}
                style={getStyles(l.nome_fantasia, this)}
              >
                {l.nome_fantasia}
              </MenuItem>
            ))}
          </Select>
        )}
        {this.state.comparaPeriodo && (
          <div className={classes.margin}>
            <DateRangePicker
              startDate={this.state.startDate1}
              endDate={this.state.endDate1}
              onDatesChange={({ startDate, endDate }) => {
                this.setState({ startDate1: startDate, endDate1: endDate });
              }}
              focusedInput={this.state.focusedInput1}
              onFocusChange={focusedInput => {
                this.setState({ focusedInput1: focusedInput });
              }}
            />
            <DateRangePicker
              startDate={this.state.startDate2}
              endDate={this.state.endDate2}
              onDatesChange={({ startDate, endDate }) => {
                this.setState({ startDate2: startDate, endDate2: endDate });
              }}
              focusedInput={this.state.focusedInput2}
              onFocusChange={focusedInput => {
                this.setState({ focusedInput2: focusedInput });
              }}
            />
            <DateRangePicker
              startDate={this.state.startDate3}
              endDate={this.state.endDate3}
              onDatesChange={({ startDate, endDate }) => {
                this.setState({ startDate3: startDate, endDate3: endDate });
              }}
              focusedInput={this.state.focusedInput3}
              onFocusChange={focusedInput => {
                this.setState({ focusedInput3: focusedInput });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);

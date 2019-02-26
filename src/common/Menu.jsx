import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import withStyles from "@material-ui/core/styles/withStyles";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";

import IconProducts from "@material-ui/icons/Collections";

import {
  translate,
  changeLocale,
  DashboardMenuItem,
  MenuItemLink,
  Responsive
} from "react-admin";

import { withRouter } from "react-router-dom";
import { changeTheme } from "../configuration/configurationActions";
import { userConfig, loja } from "../login/firebase";
import CustomCircularProgress from "../common/CircularProgress";

const styles = {
  label: {
    paddingLeft: 16,
    paddingTop: 6,
    paddingBottom: 6
  }
};

const items = [{ name: "products", icon: <IconProducts /> }];

class Menu extends Component {
  render() {
    const {
      onMenuClick,
      translate,
      logout,
      locale,
      theme,
      changeLocale,
      changeTheme,
      classes
    } = this.props;

    if (!userConfig) {
      return <CustomCircularProgress />;
    }

    if (userConfig && userConfig.locale != locale) {
      changeLocale(userConfig.locale);
    }

    if (userConfig && userConfig.theme != theme) {
      changeTheme(userConfig.theme);
    }

    return (
      <div>
        <div>
          <Typography className={classes.label} variant="button" noWrap>
            {loja.cnpj}
          </Typography>
          <Typography className={classes.label} variant="button" noWrap>
            {loja.razao_social}
          </Typography>
          <Typography className={classes.label} variant="button" noWrap>
            {loja.nome_fantasia}
          </Typography>
        </div>

        <DashboardMenuItem onClick={onMenuClick} />
        {items.map(item => (
          <MenuItemLink
            key={item.name}
            to={`/${item.name}`}
            primaryText={translate(`resources.${item.name}.name`, {
              smart_count: 2
            })}
            leftIcon={item.icon}
            onClick={onMenuClick}
          />
        ))}
        <MenuItemLink
          to="/configuration"
          primaryText={translate("pos.configuration")}
          leftIcon={<SettingsIcon />}
          onClick={onMenuClick}
        />
        {logout}
        {/* <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={translate('pos.configuration')}
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive xsmall={logout} medium={null} /> */}
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    state => ({
      theme: state.theme,
      locale: state.i18n.locale
    }),
    {
      changeLocale,
      changeTheme
    }
  ),
  translate,
  withStyles(styles)
);

export default enhance(Menu);

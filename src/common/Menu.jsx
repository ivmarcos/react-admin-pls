import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';

import IconProducts from '@material-ui/icons/Collections';

import {
    translate, changeLocale,
    DashboardMenuItem,
    MenuItemLink,
    //Responsive
} from 'react-admin';
import { withRouter } from 'react-router-dom';
import { changeTheme } from '../configuration/configurationActions'
import { data } from '../configuration/authProvider'
import CustomCircularProgress from '../common/CircularProgress'


const styles = {
    label: { 
        paddingLeft: 16, 
        paddingTop: 6,
        paddingBottom: 6,
    }
}

const items = [
    { name: 'Produtos', icon: <IconProducts /> },
]

class Menu extends Component {
    // constructor(props){
    //     super(props)
    // }

    render() {
        const { onMenuClick, translate, logout, classes } = this.props //locale, theme, changeLocale, changeTheme, 
        const {loja, user} = data;
        console.log('data', data)

        if (!user) {
            return <CustomCircularProgress />
        }

        // if (userConfig && userConfig.locale != locale) {
        //     changeLocale(userConfig.locale)
        // }
        
        // if (userConfig && userConfig.theme != theme) {
        //     changeTheme(userConfig.theme)
        // }

        return (
            <div>
                <DashboardMenuItem onClick={onMenuClick} />
                <MenuItemLink
                    to="/dashProduto"
                    primaryText='Dash Prod.'
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                />
                {
                    items.map(item => (
                    <MenuItemLink
                        key={item.name}
                        to={`/${item.name}`}
                        primaryText={item.name}
                        // Tradução
                        // primaryText={translate(`resources.${item.name}.name`, {
                        //     smart_count: 2,
                        // })}
                        leftIcon={item.icon}
                        onClick={onMenuClick}
                    />
                ))}
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
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
        )
    }
}

const enhance = compose(
    withRouter,
    connect(
        state => ({
            theme: state.theme,
            locale: state.i18n.locale,
        }),
        {
            changeLocale,
            changeTheme,
        }
    ),
    translate,
    withStyles(styles)
);

export default enhance(Menu);
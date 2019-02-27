import React, {Component} from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { translate, changeLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import { changeTheme } from './configurationActions';
import Typography from '@material-ui/core/Typography';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
}

class Configuration extends Component {
    render() {
        const {
            classes,
            theme,
            locale,
            changeTheme,
            changeLocale,
            translate,
        } = this.props

        return (
            <Card>
                <Title title={translate('pos.configuration')} />        
                <CardContent>
                    <Typography variant="body1" className={classes.label}>{translate('pos.theme.name')}</Typography>
                    <Button
                        variant="raised"
                        className={classes.button}
                        color={theme === 'light' ? 'primary' : 'default'}
                        onClick={() => {
                            //userConfig.theme = 'light'
                            changeTheme('light')
                        }}
                    >
                        {translate('pos.theme.light')}
                    </Button>
                    <Button
                        variant="raised"
                        className={classes.button}
                        color={theme === 'dark' ? 'primary' : 'default'}
                        onClick={() => {
                            //userConfig.theme = 'dark'
                            changeTheme('dark')
                        }}
                    >
                        {translate('pos.theme.dark')}
                    </Button>
                </CardContent>
                <CardContent>
                    <Typography variant="body1" className={classes.label}>{translate('pos.language')}</Typography>
                    <Button
                        variant="raised"
                        className={classes.button}
                        color={locale === 'pt-BR' ? 'primary' : 'default'}
                        onClick={() => {
                            //userConfig.locale = 'pt-BR'
                            changeLocale('pt-BR')
                        }}
                    >
                        pt-BR
                    </Button>
                    <Button
                        variant="raised"
                        className={classes.button}
                        color={locale === 'en' ? 'primary' : 'default'}
                        onClick={() => {
                            //userConfig.locale = 'en'
                            changeLocale('en')
                        }}
                    >
                        en
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    locale: state.i18n.locale,
})

export default compose(
    connect(
        mapStateToProps,
        {
            changeLocale,
            changeTheme,
        }
    ),
    translate,
    withStyles(styles)
)(Configuration)
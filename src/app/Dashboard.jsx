import React, {Component} from 'react'
import compose from 'recompose/compose'
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Title } from 'react-admin';
import { data, changeStore } from '../configuration/authProvider'
import CustomCircularProgress from '../common/CircularProgress'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 4,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      heigth: '200px'
    }
})

class Dashboard extends Component {

    handleSelect(event) {
        changeStore(event.target.value)
    }

    render() {

      const {user, loja} = data;
        if (!user) {
            return <CustomCircularProgress />
        }

        return (
            <Card>
                <Title title="Sistema Pallas" />
                <CardContent>
                    <div style={{ display: 'inline-flex' }}>
                        <div>
                            <Select value={loja.id} onChange={this.handleSelect} >
                                {user.lojas.map(l =>
                                    <MenuItem key={l.id} value={l.id}>{`${l.cnpj} - ${l.nome_fantasia}`}</MenuItem>
                                )}
                            </Select>
                            <Typography component="h2" variant="headline" gutterBottom>{loja.cnpj}</Typography >
                            <Typography component="h2" variant="headline" gutterBottom>{loja.nome_fantasia}</Typography >
                            <Typography component="h2" variant="headline" gutterBottom>{loja.razao_social}</Typography >
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(
    withStyles(styles)
)(Dashboard)
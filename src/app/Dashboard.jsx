import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
import { loja, lojas, changeStore } from "../login/firebase";
import CustomCircularProgress from "../common/CircularProgress";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    changeStore(event.target.value);
  };

  render() {
    if (!loja) return <CustomCircularProgress />;

    return (
      <Card>
        <Title title="Sistema Pallas" />
        <CardContent>
          <Select value={loja.id} onChange={this.handleChange}>
            {lojas.map(l => (
              <MenuItem key={l.id} value={l.id}>{`${l.cnpj} - ${
                l.nome_fantasia
              }`}</MenuItem>
            ))}
          </Select>
          <Typography component="h2" variant="headline" gutterBottom>
            {loja.cnpj}
          </Typography>
          <Typography component="h2" variant="headline" gutterBottom>
            {loja.nome_fantasia}
          </Typography>
          <Typography component="h2" variant="headline" gutterBottom>
            {loja.razao_social}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Dashboard;

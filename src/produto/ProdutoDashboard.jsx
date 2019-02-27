import React, { Component } from "react";
import compose from "recompose/compose";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Title } from "react-admin";
import { data } from "../configuration/authProvider";
import CustomCircularProgress from "../common/CircularProgress";

import Bar from "../common/charts/Bar";
import Search from "../common/form/MultipleSelect";

import QueryString from "query-string";

import { API_URL } from "../configuration/constants";

const url = API_URL;

const styles = theme => ({
  root: {
    minHeight: 500
  }
});

class ProdutoDashBoard extends Component {
  state = {
    loadingProd: false,
    dataProd: []
  };

  fetchProdutos = where => {
    this.setState({
      loadingProd: true,
      dataProd: []
    });

    var filter = {
      fields: {
        desc_prod: true,
        qtd_it: true,
        total_bruto_it: true
      },
      where: {
        ...where,
        qtd_it: { gt: 0 },
        total_bruto_it: { gt: 0 }
      }
    };

    var query = {
      filter: JSON.stringify(filter)
    };

    console.log(JSON.stringify(filter));

    //var uri = url + "/Venda_produtos?" + QueryString.stringify(query);
    var uri = url + "/Venda_produtos/teste?" + QueryString.stringify(query);

    let start = performance.now();
    fetch(uri)
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        console.log("TEMPO F: ", (performance.now() - start) / 1000);
        console.log("PRODUTOS", data);
        this.setState({
          loadingProd: false,
          dataProd: data
        });
      })
      .catch(ex => {
        console.log(ex);
      });
  };

  render() {
    const {user} = data;
    if (!user) {
      return <CustomCircularProgress />;
    }

    return (
      <Card className={this.props.classes.root}>
        <Title title="Painel Produto" />
        <CardContent>
          <Search handlePesquisar={this.fetchProdutos.bind(this)} />

          <Bar
            title="10 produtos mais vendidos"
            loading={this.state.loadingProd}
            data={this.state.dataProd.top10_qtd}
            indexBy="desc_prod"
            keys={["qtd_it", "total_bruto_it"]}
          />

          <Bar
            title="10 produtos mais caros"
            loading={this.state.loadingProd}
            data={this.state.dataProd.top10_bruto}
            indexBy="desc_prod"
            keys={["qtd_it", "total_bruto_it"]}
          />

          <Bar
            title="10 produtos menos vendidos"
            loading={this.state.loadingProd}
            data={this.state.dataProd.bottom10_qtd}
            indexBy="desc_prod"
            keys={["qtd_it", "total_bruto_it"]}
          />

          <Bar
            title="10 produtos menos caros"
            loading={this.state.loadingProd}
            data={this.state.dataProd.bottom10_bruto}
            indexBy="desc_prod"
            keys={["qtd_it", "total_bruto_it"]}
          />
        </CardContent>
      </Card>
    );
  }
}

ProdutoDashBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(ProdutoDashBoard);

import React from "react";
import PropTypes from "prop-types";

export const OPCOES = [
  {
    id: null,
    name: "Não tributado"
  },
  { id: "00", name: "Entrada com recuperação de crédito" },
  { id: "01", name: "Entrada tributada com alíquota zero" },
  { id: "02", name: "Entrada isenta" },
  { id: "03", name: "Entrada não-tributada" },
  { id: "04", name: "Entrada imune" },
  { id: "05", name: "Entrada com suspensão" },
  { id: "49", name: "Outras entradas" },
  { id: "50", name: "Saída tributada" },
  { id: "51", name: "Saída tributada com alíquota zero" },
  { id: "52", name: "Saída isenta" },
  { id: "53", name: "Saída não-tributada" },
  { id: "54", name: "Saída imune" },
  { id: "55", name: "Saída com suspensão" },
  { id: "99", name: "Outras Saídas" }
];

const IPIField = props => {
  return <div />;
};

IPIField.propTypes = {};

export default IPIField;

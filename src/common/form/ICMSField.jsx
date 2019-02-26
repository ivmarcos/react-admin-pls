import React from "react";
import PropTypes from "prop-types";
import { SelectField } from "react-admin";

export const Regime = {
  NORMAL: "NORMAL",
  SIMPLES: "SIMPLES"
};

export const OPCOES_REGIME_NORMAL = [
  { id: "00", name: "Tributada integralmente" },
  {
    id: "10",
    name: "Tributada e com cobrança do ICMS por substituição tributária"
  },
  { id: "20", name: "Com redução da BC" },
  {
    id: "30",
    name:
      "Isenta / não tributada e com cobrança do ICMS por substituição tributária"
  },
  { id: "40", name: "Isenta" },
  { id: "41", name: "Não tributada" },
  { id: "50", name: "Com suspensão" },
  { id: "51", name: "Com diferimento" },
  { id: "60", name: "ICMS cobrado anteriormente por substituição tributária" },
  {
    id: "70",
    name: "Com redução da BC e cobrança do ICMS por substituição tributária"
  },
  { id: "90", name: "Outras" }
];

export const OPCOES_REGIME_SIMPLES_NACIONAL = [
  {
    id: "101",
    name: "Tributada pelo Simples Nacional com permissão de crédito"
  },
  {
    id: "102",
    name: "Tributada pelo Simples Nacional sem permissão de crédito"
  },
  {
    id: "103",
    name: "Isenção do ICMS no Simples Nacional para faixa de receita bruta"
  },
  {
    id: "201",
    name:
      "Tributada pelo Simples Nacional com permissão de crédito e com cobrança do ICMS por substituição tributária"
  },
  {
    id: "202",
    name:
      "Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por substituição tributária"
  },
  {
    id: "203",
    name:
      "Isenção do ICMS no Simples Nacional para faixa de receita bruta e com cobrança do ICMS por substituição tributária"
  },
  { id: "300", name: "Imune" },
  { id: "400", name: "Não tributada pelo Simples Nacional" },
  {
    id: "500",
    name:
      "ICMS cobrado anteriormente por substituição tributária (substituído) ou por antecipação"
  },
  { id: "900", name: "Outros" }
];

const ICMSField = ({ regime, ...props }) => {
  const opcoes =
    regime === Regime.NORMAL
      ? OPCOES_REGIME_NORMAL
      : OPCOES_REGIME_SIMPLES_NACIONAL;
  return <SelectField {...props} choices={opcoes} />;
};

ICMSField.propTypes = {
  regime: PropTypes.oneOf(Object.keys(Regime).map(k => Regime[k]))
};

ICMSField.defaultProps = {
  regime: Regime.NORMAL
};
export default ICMSField;

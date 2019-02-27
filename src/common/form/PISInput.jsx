import React from "react";
import { SelectInput } from "react-admin";

export const OPCOES = [
  {
    id: "01",
    name:
      "Operação Tributável (base de cálculo = valor da operação (alíquota normal (cumulativo/não cumulativo)))"
  },
  {
    id: "02",
    name:
      "Operação Tributável (base de cálculo = valor da operação (alíquota diferenciada)"
  },
  {
    id: "03",
    name:
      "Operação Tributável (base de cálculo = quantidade vendida (alíquota por unidade de produto)"
  },
  {
    id: "04",
    name: "Operação Tributável (tributação monofásica (alíquota zero)"
  },
  { id: "05", name: "Operação Tributável por Substituição Tributária" },
  { id: "06", name: "Operação Tributável (alíquota zero" },
  { id: "07", name: "Operação Isenta da Contribuição" },
  { id: "08", name: "Operação Sem Incidência da Contribuição" },
  { id: "09", name: "Operação com Suspensão da Contribuição" },
  { id: "49", name: "Outras Operações de Saída" },
  { id: "99", name: "Outras Operações" }
];
const PISField = (props) => {
  return <SelectInput {...props} choices={OPCOES} />;
};

export default PISField;

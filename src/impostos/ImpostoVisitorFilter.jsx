import React from "react";
import { TextInput, NumberInput, Filter } from "react-admin";

const ImpostoVisitorFilter = props => (
  <Filter {...props}>
    <TextInput source="nome" alwaysOn />
    <NumberInput source="cod_prod" />
    <TextInput source="cod_aux" />
    <NumberInput source="preco" />
  </Filter>
);

export default ImpostoVisitorFilter;

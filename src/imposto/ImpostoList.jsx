import React from "react";
import {
  Datagrid,
  List,
  TextField,
  ShowButton,
  EditButton,
  DeleteButton
} from "react-admin";

import ImpostoVisitorFilter from "./ImpostoVisitorFilter";

const ImpostoList = props => (
  <List {...props} filters={<ImpostoVisitorFilter />}>
    <Datagrid>
      <TextField source="descricao" label="Descrição"/>
      <TextField source="icms_cst" label="ICMS"/>
      <TextField source="icms_alq" label="ICMS Alíquota"/>
      <TextField source="icms_st_mva" label="MVA"/>
      <TextField source="icms_st_mva" label="MVA"/>
      <TextField source="cest" label="CEST"/>
      <TextField source="ipi_cst" label="IPI"/>
      <TextField source="ipi_alq" label="IPI Alíquota"/>
      <TextField source="pis_cst" label="PIS"/>
      <TextField source="pis_alq" label="PIS Alíquota"/>
      <TextField source="cofins_cst" label="COFINS"/>
      <TextField source="cofins_alq" label="COFINS Alíquota"/>
      <TextField source="cfop_estadual" label="CFOP Estadual"/>
      <TextField source="cfop_federal" label="CFOP Federal"/>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ImpostoList;

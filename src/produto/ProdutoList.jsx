import React from "react";
import {
  Datagrid,
  List,
  TextField,
  ShowButton,
  EditButton,
  DeleteButton
} from "react-admin";

import ProdutoVisitorFilter from "./ProdutoVisitorFilter";

const ProdutoList = props => (
  <List {...props} filters={<ProdutoVisitorFilter />}>
    <Datagrid>
      <TextField source="cod_prod" />
      <TextField source="cod_aux" />
      <TextField source="nome" />
      <TextField source="preco" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ProdutoList;

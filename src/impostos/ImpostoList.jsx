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

export default ImpostoList;

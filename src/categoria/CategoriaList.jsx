import React from "react";
import {
  Datagrid,
  List,
  TextField,
  ShowButton,
  EditButton,
  DeleteButton
} from "react-admin";

const CategoriaList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="name" />
      <TextField source="hugo" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default CategoriaList;

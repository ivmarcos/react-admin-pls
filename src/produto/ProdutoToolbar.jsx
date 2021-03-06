import React from "react";
import { SaveButton, Toolbar } from "react-admin";

const ProdutoToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export default ProdutoToolbar;

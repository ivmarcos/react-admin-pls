import React from "react";
import { SaveButton, Toolbar } from "react-admin";

const CategoriaToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export default CategoriaToolbar;

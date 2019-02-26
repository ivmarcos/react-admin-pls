import React from "react";
import { Edit } from "react-admin";

import ProdutoForm from "./ProdutoForm";
import ProdutoToolbar from "./ProdutoToolbar";

const ProdutoEdit = props => (
  <Edit {...props}>
    <ProdutoForm toolbar={<ProdutoToolbar />} />
  </Edit>
);

export default ProdutoEdit;

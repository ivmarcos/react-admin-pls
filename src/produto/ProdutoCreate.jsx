import React from "react";
import { Create } from "react-admin";

import ProdutoForm from "./ProdutoForm";
import ProdutoToolbar from "./ProdutoToolbar";

const ProdutoCreate = props => (
  <Create {...props}>
    <ProdutoForm toolbar={<ProdutoToolbar />} />
  </Create>
);

export default ProdutoCreate;

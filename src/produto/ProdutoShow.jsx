import React from "react";
import { Show } from "react-admin";

import ProdutoForm from "./ProdutoForm";

const ProdutoShow = props => (
  <Show {...props}>
    <ProdutoForm toolbar={null} />
  </Show>
);

export default ProdutoShow;

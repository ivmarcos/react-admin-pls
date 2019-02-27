import React from "react";
import { Show, Form } from "react-admin";
import CategoriaForm from "./CategoriaForm";

const CategoriaShow = props => (
  <Show {...props}>
    <CategoriaForm toolbar={null} />
  </Show>
);
export default CategoriaShow;

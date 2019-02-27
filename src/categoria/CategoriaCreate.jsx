import React from "react";
import { Create, Form } from "react-admin";
import CategoriaToolbar from "./CategoriaToolbar";
import CategoriaForm from "./CategoriaForm";

export const CategoriaCreate = props => (
  <Create {...props}>
    <CategoriaForm toolbar={<CategoriaToolbar />} />
  </Create>
);

export default CategoriaCreate;

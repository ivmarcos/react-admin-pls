import React from "react";
import { Edit } from "react-admin";
import CategoriaToolbar from "./CategoriaToolbar";
import CategoriaForm from "./CategoriaForm";

const CategoriaEdit = props => (
  <Edit {...props}>
    <CategoriaForm toolbar={<CategoriaToolbar />} />
  </Edit>
);

export default CategoriaEdit;

import React from "react";
import { Resource } from "react-admin";
import CategoriaList from "./CategoriaList";
import CategoriaShow from "./CategoriaShow";
import CategoriaCreate from "./CategoriaCreate";
import CategoriaEdit from "./CategoriaEdit";

const CategoriaResource = () => (
  <Resource
    name={`categories`}
    list={CategoriaList}
    show={CategoriaShow}
    create={CategoriaCreate}
    edit={CategoriaEdit}
  />
);

export default CategoriaResource;

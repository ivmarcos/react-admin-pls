import React from "react";
import { Resource } from "react-admin";
import ProdutoList from "./ProdutoList";
import ProdutoShow from "./ProdutoShow";
import ProdutoCreate from "./ProdutoCreate";
import ProdutoEdit from "./ProdutoEdit";

const ProdutoResource = () => (
  <Resource
    name={`products`}
    list={ProdutoList}
    show={ProdutoShow}
    create={ProdutoCreate}
    edit={ProdutoEdit}
  />
);

export default ProdutoResource;

import React from "react";
import { Resource } from "react-admin";
import ImpostoList from "./ImpostoList";
import ImpostoShow from "./ImpostoShow";
import ImpostoCreate from "./ImpostoCreate";
import ImpostoEdit from "./ImpostoEdit";

const ImpostoResource = () => (
  <Resource
    name={`products`}
    list={ImpostoList}
    show={ImpostoShow}
    create={ImpostoCreate}
    edit={ImpostoEdit}
  />
);

export default ImpostoResource;

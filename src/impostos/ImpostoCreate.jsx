import React from "react";
import { Create } from "react-admin";

import ImpostoForm from "./ImpostoForm";
import ImpostoToolbar from "./ImpostoToolbar";

const ImpostoCreate = props => (
  <Create {...props}>
    <ImpostoForm toolbar={<ImpostoToolbar />} />
  </Create>
);

export default ImpostoCreate;

import React from "react";
import { Edit } from "react-admin";

import ImpostoForm from "./ImpostoForm";
import ImpostoToolbar from "./ImpostoToolbar";

const ImpostoEdit = props => (
  <Edit {...props}>
    <ImpostoForm toolbar={<ImpostoToolbar />} />
  </Edit>
);

export default ImpostoEdit;

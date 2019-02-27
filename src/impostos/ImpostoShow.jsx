import React from "react";
import { Show } from "react-admin";

import ImpostoForm from "./ImpostoForm";

const ImpostoShow = props => (
  <Show {...props}>
    <ImpostoForm toolbar={null} />
  </Show>
);

export default ImpostoShow;

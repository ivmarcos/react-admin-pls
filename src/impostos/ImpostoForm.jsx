import React from "react";
import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minLength,
  minValue
} from "react-admin";

import {Typography} from '@material-ui/core';

import { isInteger } from "../utils/validations";

const validateCodProd = [required(), isInteger, minValue(1)];
const validateNome = [required(), minLength(1)];
const validatePreco = [required(), minValue(0.01)];

const ImpostosForm = props =>  {
  console.log('props', props);
return (
  <div>
   <Typography>Impostos</Typography>

    <NumberInput source="cod_prod" validate={validateCodProd} />
    <TextInput source="cod_aux" />
    <TextInput source="nome" validate={validateNome} />
    <NumberInput
      source="preco"
      validate={validatePreco}
      inputProps={{
        step: 0.01
      }}
    />
  </div>
);
    }

export default ImpostosForm;

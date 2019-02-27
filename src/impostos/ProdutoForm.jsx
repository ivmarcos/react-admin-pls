import React from "react";
import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minLength,
  minValue
} from "react-admin";

import ImpostosForm from '../impostos/ImpostosForm';
import { isInteger } from "../utils/validations";

const validateCodProd = [required(), isInteger, minValue(1)];
const validateNome = [required(), minLength(1)];
const validatePreco = [required(), minValue(0.01)];

const ImpostoForm = props => { 
console.log('props', props);

return (
  <SimpleForm {...props} toolbar={props.toolbar} redirect="list">
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
    <hr/>
    <ImpostosForm/>
  </SimpleForm>
);
    }
export default ImpostoForm;

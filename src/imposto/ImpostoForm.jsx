import React from "react";
import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minLength,
  minValue
} from "react-admin";

import { isInteger } from "../utils/validations";
import ICMSInput from '../common/form/ICMSInput';

const validateCodProd = [required(), isInteger, minValue(1)];
const validateNome = [required(), minLength(1)];
const validatePreco = [required(), minValue(0.01)];

const ImpostosForm = props =>  {
  console.log('props', props);
return (
  <div>
   <TextInput source="descricao" label="Descrição"/>
      <ICMSInput source="icms_cst" label="ICMS"/>
      <TextInput source="icms_alq" label="ICMS Alíquota"/>
      <TextInput source="icms_st_mva" label="MVA"/>
      <TextInput source="icms_st_mva" label="MVA"/>
      <TextInput source="cest" label="CEST"/>
      <TextInput source="ipi_cst" label="IPI"/>
      <TextInput source="ipi_alq" label="IPI Alíquota"/>
      <TextInput source="pis_cst" label="PIS"/>
      <TextInput source="pis_alq" label="PIS Alíquota"/>
      <TextInput source="cofins_cst" label="COFINS"/>
      <TextInput source="cofins_alq" label="COFINS Alíquota"/>
      <TextInput source="cfop_estadual" label="CFOP Estadual"/>
      <TextInput source="cfop_federal" label="CFOP Federal"/>
  </div>
);
    }

export default ImpostosForm;

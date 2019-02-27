import React, {Component} from "react";
import {
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minLength,
  minValue
} from "react-admin";

import { isInteger } from "../utils/validations";
import ICMSInput, {Regime} from '../common/form/ICMSInput';
import IPIInput from '../common/form/IPIInput';
import PISInput from '../common/form/PISInput';
import {data} from '../configuration/authProvider';

const validateCodProd = [required(), isInteger, minValue(1)];
const validateNome = [required(), minLength(1)];
const validatePreco = [required(), minValue(0.01)];

class ImpostosForm extends Component {
  render(){
    const { loja } = data;
    console.log('loja', loja);
    console.log('props', this.props);
    const regime = loja.regime_tributario === 1 ? Regime.SIMPLES : Regime.NORMAL;
    return (
  <SimpleForm {...this.props} toolbar={this.props.toolbar} redirect="list">
      <TextInput source="descricao" label="Descrição"/>
      <ICMSInput source="icms_cst" label="ICMS" regime={regime}/>
      <NumberInput source="icms_alq" label="ICMS Alíquota"/>
      <TextInput source="icms_st_mva" label="MVA"/>
      <TextInput source="cest" label="CEST"/>
      <IPIInput source="ipi_cst" label="IPI"/>
      <NumberInput source="ipi_alq" label="IPI Alíquota"/>
      <PISInput source="pis_cst" label="PIS"/>
      <NumberInput source="pis_alq" label="PIS Alíquota"/>
      <TextInput source="cofins_cst" label="COFINS"/>
      <NumberInput source="cofins_alq" label="COFINS Alíquota"/>
      <TextInput source="cfop_estadual" label="CFOP Estadual"/>
      <TextInput source="cfop_federal" label="CFOP Federal"/>
  </SimpleForm>
);
    }
  }

export default ImpostosForm;

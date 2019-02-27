import React from "react";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput
} from "react-admin";

const CategoriaForm = props => (
  <SimpleForm {...props} toolbar={props.toolbar} redirect="list">
    <TextInput source="title" />
    <TextInput source="name" />
    <TextInput source="hugo" />
    <ReferenceInput source="categoria_id" reference="posts" allowEmpty>
      <SelectInput optionText="title" />
    </ReferenceInput>
    <ArrayInput source="backlinks">
      <SimpleFormIterator
        disableAdd={props.toolbar == null}
        disableRemove={props.toolbar == null}
      >
        <DateInput source="date" />
        <TextInput source="url" />
        <ReferenceInput source="categoria_id" reference="posts" allowEmpty>
          <SelectInput optionText="title" />
        </ReferenceInput>
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
);

export default CategoriaForm;

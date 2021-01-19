import React, { useState, useCallback } from "react";
import { Form, Dropdown, DropdownProps, Divider } from "semantic-ui-react";

import { EntryType, NewEntry } from "../types";
import {
  healthCheckInitialValues,
  occupationalHealthCareInitialValues,
  hospitalInitialValues,
  entryTypeOptions
} from "../utils/formHelpers";
import {
  healthCheckSchema,
  occupationalHealthCareSchema,
  hospitalSchema
} from "../utils/validations";

import AddEntryForm from "./AddEntryForm";

interface WrapperProps {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryFormWrapper: React.FC<WrapperProps> = ({ onCancel, onSubmit }) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const handleChange = (
    _e: React.SyntheticEvent,
    { value }: DropdownProps
  ): void => {
    if (value) {
      setEntryType(value as EntryType);
    }
  };

  const entryForm = useCallback(() => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <AddEntryForm
            initialValues={healthCheckInitialValues}
            validationSchema={healthCheckSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.OccupationalHealthCare:
        return (
          <AddEntryForm
            initialValues={occupationalHealthCareInitialValues}
            validationSchema={occupationalHealthCareSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.Hospital:
        return (
          <AddEntryForm
            initialValues={hospitalInitialValues}
            validationSchema={hospitalSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  }, [entryType, onCancel, onSubmit]);

  return (
    <>
      <Form>
        <Form.Field>
          <label>Entry Type</label>
          <Dropdown
            fluid
            onChange={handleChange}
            options={entryTypeOptions}
            selection
            value={entryType}
          />
        </Form.Field>
      </Form>

      <Divider />

      {entryForm()}
    </>
  );
};

export default AddEntryFormWrapper;

import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField } from "../components/FormField";
import { NewPatient } from "../types";
import { genderOptions, patientInitialValues } from "../utils/formHelpers";
import { patientSchema } from "../utils/validations";

interface PatientFormProps {
  onSubmit: (values: NewPatient) => void;
  onCancel: () => void;
}

const AddPatientForm: React.FC<PatientFormProps> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={patientInitialValues}
      validationSchema={patientSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />

            <Field
              label="Social Security Number"
              placeholder="SSN"
              name="ssn"
              component={TextField}
            />

            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />

            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />

            <SelectField
              label="Gender"
              name="gender"
              options={genderOptions}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;

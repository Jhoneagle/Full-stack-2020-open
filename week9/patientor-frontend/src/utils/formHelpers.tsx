import { EntryType, Gender, NewEntry, NewPatient } from "../types";
import { GenderOption } from "../components/FormField";

export const entryTypeOptions = [
    {
        key: EntryType.HealthCheck,
        value: EntryType.HealthCheck,
        text: "Health Check",
    },
    {
        key: EntryType.OccupationalHealthCare,
        value: EntryType.OccupationalHealthCare,
        text: "Occupational Health Care",
    },
    {
        key: EntryType.Hospital,
        value: EntryType.Hospital,
        text: "Hospital"
    }
];

export const genderOptions: GenderOption[] = [
    { value: Gender.Male, label: "Male" },
    { value: Gender.Female, label: "Female" },
    { value: Gender.Other, label: "Other" }
];

const entryInitialValues = {
    description: "",
    date: "",
    specialist: "",
};

export const healthCheckInitialValues: NewEntry = {
    ...entryInitialValues,
    type: EntryType.HealthCheck,
    healthCheckRating: 0,
};

export const occupationalHealthCareInitialValues: NewEntry = {
    ...entryInitialValues,
    type: EntryType.OccupationalHealthCare,
    employerName: "",
    sickLeave: { startDate: "", endDate: "" },
};

export const hospitalInitialValues: NewEntry = {
    ...entryInitialValues,
    type: EntryType.Hospital,
    discharge: { date: "", criteria: "" },
};

export const patientInitialValues: NewPatient = {
    name: "",
    ssn: "",
    dateOfBirth: "",
    occupation: "",
    gender: Gender.Other
};

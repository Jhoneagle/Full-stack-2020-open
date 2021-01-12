import patientData from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatient, NewEntry, Entry } from "../types";
import { v4 as uuid } from "uuid";

let patients: Array<Patient> = patientData;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findById = (id: any): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return { id, name, dateOfBirth, gender, occupation, entries };
  });
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid(), entries: [] as Entry[] };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry: Entry = { ...newEntry, id: uuid() };
  const savedPatient = { ...patient };

  savedPatient.entries.push(entry);

  patients = patients.map((p) =>
    p.id === savedPatient.id ? savedPatient : p
  );

  return savedPatient;
};

export default {
  getPatients,
  findById,
  addPatient,
  addEntry
};
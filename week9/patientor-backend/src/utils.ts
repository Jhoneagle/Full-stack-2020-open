/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable  @typescript-eslint/no-unsafe-call */
/* eslint-disable  @typescript-eslint/no-unsafe-return */
import {
  Diagnosis,
  NewPatient,
  Gender,
  Entry,
  EntryType,
  HealthCheckRating,
  SickLeave,
  Discharge,
  NewBaseEntry,
  NewEntry,
} from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isEntryType = (entry: any): entry is Entry => {
  const healthCheck: boolean = entry.type === EntryType.HealthCheck;
  const occupationalHealthcare: boolean = entry.type === EntryType.OccupationalHealthCare;
  const hospital: boolean = entry.type === EntryType.Hospital;

  return healthCheck || occupationalHealthcare || hospital;
};

export const parseString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }

  return param;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender.toLowerCase())) {
    throw new Error("Incorrect or missing gender");
  }

  return gender.toLowerCase() as Gender;
};

const parseDate = (date: any, paramName: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }

  return date;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing health check rating");
  }

  return healthCheckRating;
};

const parseSickLeave = (object: any): SickLeave => {
  if (!object) {
    throw new Error("Missing sick leave");
  }

  return {
    startDate: parseDate(object.startDate, "sick leave start date"),
    endDate: parseDate(object.endDate, "sick leave end date"),
  };
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    return [];
  }

  if (entries.map((entry: any) => !isEntryType(entry))) {
    throw new Error("Incorrect or missing entries");
  }

  return entries as Entry[];
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error("Missing discharge");
  } else {
    if (!discharge.date) {
      throw new Error("Incorrect or missing discharge-date");
    }

    if (!discharge.criteria) {
      throw new Error("Incorrect or missing discharge-criteria");
    }

    return {
      date: parseDate(discharge.date, "discharge date"),
      criteria: parseString(discharge.criteria, "discharge criteria"),
    };
  }
};

const parseEntryType = (entryType: any): EntryType => {
  if (!Object.values(EntryType).includes(entryType)) {
    throw new Error("Incorrect or missing type");
  }

  return entryType;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes) {
    return diagnosisCodes;
  }

  if (!Array.isArray(diagnosisCodes)) {
    throw new Error("Incorrect diagnosisCodes");
  }

  const codes = diagnosisCodes as Array<any>;

  const validDiagnosisCodes = codes.every((code: any) =>
    isString(code)
  );

  if (validDiagnosisCodes) {
    return codes;
  } else {
    throw new Error("Incorrect diagnosisCodes");
  }
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, "name"),
    occupation: parseString(object.occupation, "occupation"),
    gender: parseGender(object.gender),
    ssn: parseString(object.ssn, "social security number"),
    dateOfBirth: parseDate(object.dateOfBirth, "date of birth"),
    entries: parseEntries(object.entries) || []
  };
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseEntryType(object.type),
    description: parseString(object.description, "description"),
    date: parseDate(object.date, "date"),
    specialist: parseString(object.specialist, "specialist"),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.OccupationalHealthCare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseString(object.employerName, "employer name"),
      };

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newEntry;
    case EntryType.Hospital:
      return { ...newBaseEntry, discharge: parseDischarge(object.discharge) };
    default:
      return assertNever(newBaseEntry);
  }
};
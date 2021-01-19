/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
import {
  Gender,
  Entry,
  EntryType,
  Patient
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

const isArrayOfEntries = (param: any[]): param is Entry[] => {
  const hasInvalidEntry = param.some((entry) => {
    return !Object.values(EntryType).includes(entry.type);
  });

  return !hasInvalidEntry;
};

const parseToString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(
      `Incorrect or missing ${paramName}`
    );
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
    throw new Error(
      `Incorrect or missing ${paramName}`
    );
  }

  return date;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries) || !isArrayOfEntries(entries)) {
    throw new Error(
      `Incorrect or missing entries: ${JSON.stringify(entries)}`
    );
  }

  return entries;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toPatient = (object: any): Patient => {
  return {
    name: parseToString(object.name, "name"),
    occupation: parseToString(object.occupation, "occupation"),
    gender: parseGender(object.gender),
    ssn: parseToString(object.ssn, "ssn"),
    dateOfBirth: parseDate(object.dateOfBirth, "dateOfBirth"),
    id: parseToString(object.id, "id"),
    entries: parseEntries(object.entries),
  };
};

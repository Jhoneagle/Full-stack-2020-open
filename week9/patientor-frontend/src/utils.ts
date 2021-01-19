/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
import {
  Gender,
  Entry,
  EntryType,
  Patient,
  HealthCheckRating
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

export const isHealthCheckEntry = (values: any): values is HealthCheckEntry => {
  return (
    values.healthCheckRating === HealthCheckRating.LowRisk ||
    values.healthCheckRating === HealthCheckRating.Healthy ||
    values.healthCheckRating === HealthCheckRating.HighRisk ||
    values.healthCheckRating === HealthCheckRating.CriticalRisk
  );
};

export const isValidDate = (date: any): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!date.match(regEx)) {
    return false; // Invalid format
  }

  const d = new Date(date);
  const dNum = d.getTime();

  if (!dNum && dNum !== 0) {
    return false; // NaN value, Invalid date
  }

  return d.toISOString().startsWith(date);
};

export const isValidHealthCeckValue = (value: any): boolean => {
  return (
    value === HealthCheckRating.Healthy ||
    value === HealthCheckRating.LowRisk ||
    value === HealthCheckRating.HighRisk ||
    value === HealthCheckRating.CriticalRisk
  );
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
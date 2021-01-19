import * as yup from "yup";

const entrySchema = yup.object().shape({
    description: yup.string().min(12).required(),
    date: yup
        .string()
        .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
        .required(),
    specialist: yup.string().min(6).required(),
    diagnosisCodes: yup.array().of(yup.string()),
});

export const healthCheckSchema = entrySchema.concat(
    yup.object().shape({
        healthCheckRating: yup
            .number()
            .typeError("health check rating must be a number")
            .min(0)
            .max(3)
            .required("Please enter a rating from 0(great) - 3(critical)"),
    })
);

export const occupationalHealthCareSchema = entrySchema.concat(
    yup.object().shape({
        employerName: yup.string().min(3).required(),
        sickLeave: yup.object().shape({
            startDate: yup
                .string()
                .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
            endDate: yup
                .string()
                .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
        }),
    })
);

export const hospitalSchema = entrySchema.concat(
    yup.object().shape({
        discharge: yup
            .object({
                date: yup
                    .string()
                    .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
                    .required("discharge date is a required field"),
                criteria: yup
                    .string()
                    .min(12)
                    .required("discharge criteria is a required field"),
            })
            .required(),
    })
);

export const patientSchema = yup.object().shape({
    name: yup.string().required(),
    ssn: yup.string().required(),
    dateOfBirth: yup
        .string()
        .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
        .required("date of birth is a required field"),
    occupation: yup.string().min(3).required(),
});

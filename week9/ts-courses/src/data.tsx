import { CoursePart } from './types';

export const courseName = "Half Stack application development";

export const courseParts: CoursePart[] = [
  {
    id: 1,
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    id: 2,
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    id: 3,
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    id: 4,
    name: "Project folder structure",
    exerciseCount: 11,
    description: "Random description",
    groupProjectCount: 2
  },
];
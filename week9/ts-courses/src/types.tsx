export interface CoursePartBase {
  id: number;
  name: string;
  exerciseCount: number;
  description?: string;
}

export interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBase {
  name: "Project folder structure";
  groupProjectCount: number;
}

export type CoursePart = 
  CoursePartOne |
  CoursePartTwo |
  CoursePartThree |
  CoursePartFour;


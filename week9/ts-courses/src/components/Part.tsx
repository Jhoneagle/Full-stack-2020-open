import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils/helpers';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          {part.description && (
            <p>
              <em>{part.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
            Group Projects: <strong>{part.groupProjectCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          {part.description && (
            <p>
              <em>{part.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
            Submission Link:{" "}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </p>
          <hr />
        </div>
      );
    case "Project folder structure":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          {part.description && (
            <p>
              <em>{part.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
            Group Projects: <strong>{part.groupProjectCount}</strong>
          </p>
          <hr />
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
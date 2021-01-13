import React from 'react';

interface TotalProps {
  ExercisesCount: number;
}

const Total: React.FC<TotalProps> = ({ ExercisesCount }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {ExercisesCount}
      </p>
    </>
  );
};

export default Total;
import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { courseName, courseParts } from './data';

const App: React.FC = () => {
  const totalExercises = courseParts.reduce((carry, part) => 
    carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header title={courseName} />
      <Content data={courseParts} />
      <Total ExercisesCount={totalExercises} />
    </div>
  );
};

export default App;
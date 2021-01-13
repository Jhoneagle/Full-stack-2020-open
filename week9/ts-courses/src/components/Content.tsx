import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  data: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ data }) => {
  return (
    <>
      {data.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

export default Content;
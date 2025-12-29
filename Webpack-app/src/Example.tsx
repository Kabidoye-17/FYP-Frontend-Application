import React from 'react';

interface ExampleProps {
  message: string;
}

const Example: React.FC<ExampleProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default Example;

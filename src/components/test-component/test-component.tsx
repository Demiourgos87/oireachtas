import { useState } from 'react';

import { Button } from '@mui/material';

const TestComponent = () => {
  const [text, setText] = useState('This is a component for testing purposes.');

  const handleOnClick = () => {
    console.log('clicked');
    setText('Some changed text');
  };

  return (
    <section className="test-component">
      <h1>Test Component</h1>
      <p>{text}</p>

      <Button onClick={handleOnClick}>Change text</Button>
    </section>
  );
};

export default TestComponent;

import React from 'react';
import { Button } from 'react-bootstrap';

const LoadingButton = ({ handleClick, buttonClass, disabled, isPopdown }) => (
  <Button
    className={`small-tile-button ${isPopdown ? 'popdown-button' : ''}`}
    onClick={() => handleClick()}
    disabled={disabled}
  >
    <span className={buttonClass} />
  </Button>
);

export default LoadingButton;

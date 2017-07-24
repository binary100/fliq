import React from 'react';
import { Button } from 'react-bootstrap';

const LoadingButton = ({ handleClick, buttonClass, disabled }) => {
  return (
    <Button
      className="small-tile-button"
      onClick={() => handleClick()}
      disabled={disabled}
    >
      <span className={buttonClass} />
    </Button>
  );
};

export default LoadingButton;

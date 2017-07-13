import React from 'react';
import { Button } from 'react-bootstrap';

const LoadingButton = ({ handleClick, buttonText}) => {
  return (
    <Button
      className="col-sm-10 small-tile-button"
      onClick={() => handleClick()}
    >
      { buttonText }
    </Button>
  );
};

export default LoadingButton;

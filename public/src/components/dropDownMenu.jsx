import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const DropDownMenu = ({ onSelect }) => {
  return (
    <div>
      <DropdownButton onSelect={onSelect} bsStyle={'default'} title={'Select Category'} key={1} id={`dropdown-basic-${1}`}>
        <MenuItem eventKey="genre">Genre</MenuItem>
        <MenuItem eventKey="actor" active={false}>Actor</MenuItem>
        <MenuItem eventKey="director">Director</MenuItem>
        <MenuItem eventKey="all">All</MenuItem>
      </DropdownButton>
    </div>
  );
};

export default DropDownMenu;

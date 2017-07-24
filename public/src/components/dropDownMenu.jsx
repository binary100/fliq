import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const DropDownMenu = ({ onSelect }) => {
  return (
    <DropdownButton onSelect={onSelect} bsStyle={'default'} title={'This is title'} key={1} id={`dropdown-basic-${1}`}>
      <MenuItem eventKey="actor">Actor</MenuItem>
      <MenuItem eventKey="director" active={false}>Director</MenuItem>
      <MenuItem eventKey="genre">Genre</MenuItem>
    </DropdownButton>
  )
}

export default DropDownMenu;

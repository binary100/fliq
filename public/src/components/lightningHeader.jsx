import React from 'react';
import PropTypes from 'prop-types';

const LightningHeader = props => (
  <div className="row">
    <div className="col-sm-12 lightning-header">
      <h2>Which movie do you prefer?</h2>
    </div>
  </div>
);

LightningHeader.propTypes = {
  timer: PropTypes.string
};

export default LightningHeader;

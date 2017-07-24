import React from 'react';
import { Link } from 'react-router-dom';

const LightningFooter = props => (
  <div className="row">
    <div className="col-sm-12">
      <div className="lightning-footer">
        <h3 className="col-sm-6">{`When you want to see FLIQ's suggestions, click here: `}</h3>
        <div className="col-sm-6">
          <Link to="/results">
            <button
              className="btn btn-lg btn-primary fliq-button pull-left"
            >
              See Suggestions
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default LightningFooter;
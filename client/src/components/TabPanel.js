import * as React from 'react';
import PropTypes from 'prop-types';
import './TabPanel.css'
function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div 
        className = "TabPanel"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && children}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default TabPanel
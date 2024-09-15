import React from 'react';
import AnimatedChart from './AnimatedChart';
import './g_info.css'; // Ensure the CSS file is correctly imported

function MoreInformation() {
  return (
    <div className="more-information">
      <h1>More Information</h1>
      <p>Here is some detailed information including the land price trends.</p>
      <AnimatedChart /> {/* Include the AnimatedChart component */}
    </div>
  );
}

export default MoreInformation;

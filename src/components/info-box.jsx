import React from 'react';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

export default (props) => (
  <InfoBox
    position={props.position}
    visible={props.visible}
  >
    <div className="info-box">
      Some info
    </div>
  </InfoBox>
);
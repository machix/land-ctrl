import React from 'react';
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager';

class DrawingMan extends React.Component {
  render() {
    return <DrawingManager
      onPolygonComplete={this.props.onPolygonComplete}
      defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYGON}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        },
      }}
    />
  }
}

export default DrawingMan;
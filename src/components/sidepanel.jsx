import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/appActions';
import FieldInfo from './field-info';

class SidePanel extends React.Component {
  render() {
    const failClass = this.props.drawingEnabled ? 'failure-background' : '';
    return this.props.showFieldInfo ? 
      <div className="sidepanel">
        <FieldInfo
          onClose={() => {
            this.props.hideFieldInfo();
            this.props.deselectPoly();
          }}
          removeFieldPoly={this.props.removeSelectedPoly}
        />
      </div>
    :
      <div className="sidepanel">
        <div
          className={`button ${failClass}`}
          onClick={() => this.props.enableDrawing(!this.props.drawingEnabled)}
        >
          {this.props.drawingEnabled ? 'Cancel' : 'Add field'}
        </div>
        <div
          className="button"
          onClick={() => this.props.focusOnHome()}
        >
          Focus on home
        </div>
        <div
          className="button"
          onClick={() => this.props.saveHomeLocation()}
        >
          Set home location
        </div>
      </div>;
  }
}

const mapStateToProps = state => ({
  showFieldInfo: state.app.showFieldInfo,
  drawingEnabled: state.app.drawingEnabled,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
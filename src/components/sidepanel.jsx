import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/appActions';
import FieldInfo from './field-info';

class SidePanel extends React.Component {
  render() {
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
        <div>Fields</div>
        <div onClick={() => this.props.enableDrawing(true)}>Add field</div>
      </div>;
  }
}

const mapStateToProps = state => ({
  showFieldInfo: state.app.showFieldInfo,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
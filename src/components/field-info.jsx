import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/fieldsActions';

class FieldForm extends React.Component {
  constructor(props) {
    super(props);
    
    const field = props.fields.find(f => f.id === props.selectedField) || {};
    this.state = {
      id: props.selectedField,
      status: field.status || '0', 
    }
  }

  componentWillReceiveProps(props) {
    const field = props.fields.find(f => f.id === props.selectedField);
    if (field) {
      this.setState({
        id: field.id,
        status: field.status, 
      });
    }
  }

  changeStatus = (e) => {
    const val = e.target.options[e.target.selectedIndex].value;
    this.setState({ status: val });
  }

  close = () => {
    if (!this.props.selectedField) {
      this.props.removeFieldPoly();
    }
    this.props.onClose();
  }

  save = () => {
    this.props.addField({
      ...this.state,
    });
    this.props.onClose();
  }

  render() {
    const showDelete = !!this.props.fields.find(f => f.id === this.props.selectedField);
    return (
      <div className="field-info">
        <div>
          <span>Status: </span>
          <select value={this.state.status} onChange={this.changeStatus}>
            {this.props.statuses.map(a => <option value={a.id} key={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div className="field-info-controls border-between">
          <div onClick={this.close}>Close</div>
          {showDelete ? <div>Delete</div> : null}
          <div onClick={this.save}>Save</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  statuses: state.fields.statuses,
  fields: state.fields.items,
  selectedField: state.app.selectedField,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FieldForm);
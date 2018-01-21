import React from 'react';
import DebounceInput from 'react-debounce-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/fieldsActions';

class FieldForm extends React.Component {
  constructor(props) {
    super(props);
    
    const field = props.fields.find(f => f._id === props.selectedField) || {};
    this.state = {
      _id: props.selectedField,
      status: field.status || '0',
      notes: field.notes || '',
      color: field.color || '#000000',
    }
  }

  componentWillReceiveProps(props) {
    const field = props.fields.find(f => f._id === props.selectedField);
    if (field) {
      this.setState({
        _id: field._id,
        status: field.status,
        notes: field.notes || '',
        color: field.color || '#000000',
      });
    }
  }

  changeStatus = (e) => {
    const val = e.target.options[e.target.selectedIndex].value;
    this.setState({ status: val });
  }

  close = () => {
    if (this.isNew()) {
      this.props.removeFieldPoly();
    }
    this.props.onClose();
  }

  del = () => {
    this.props.removeFieldPoly();
    this.props.deleteField(this.state._id);
    this.props.onClose();
  }

  save = () => {
    if (this.isNew()) {
      this.props.addField({
        ...this.state,
      });
    } else {
      this.props.updateField({
        ...this.state,
      });
    }
    this.props.onClose();
  }

  isNew = () => !this.props.fields.find(f => f._id === this.props.selectedField)

  render() {
    return (
      <div className="field-info">
        <div className="field-info-form">
          <div>
            <span>Status: </span>
            <select value={this.state.status} onChange={this.changeStatus}>
              {this.props.statuses.map(a => <option value={a._id} key={a._id}>{a.name}</option>)}
            </select>
          </div>
          <div>
            <span>Notes: </span>
            <DebounceInput 
              element="textarea"
              debounceTimeout={500}
              value={this.state.notes}
              onChange={(e) => this.setState({ notes: e.target.value })}
              style={{minHeight: '30vh'}}
            />
          </div>
          <div>
            <span>Color: </span>
            <input 
              type="color"
              value={this.state.color}
              onChange={(e) => this.setState({ color: e.target.value })}
            />
          </div>
        </div>
        <div className="field-info-controls border-between">
          <div onClick={this.close} className="neutral">Close</div>
          {!this.isNew() ? 
            <div onClick={this.del} className="failure">Delete</div>
            : null
          }
          <div onClick={this.save} className="success">Save</div>
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
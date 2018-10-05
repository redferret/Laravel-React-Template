
import React from 'react';

import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';

class Input extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: this.props.initialValue,
      validationState: this.props.validationCallback()
    };
    this.ignoreBlur = true;
  }

  handleChange(event) {
    switch(event.type) {
      case 'blur':
        if (!this.ignoreBlur) {
          this.props.callback(event);
          this.ignoreBlur = true;
        }
        break;
      case 'keypress':
        if (event.key === 'Enter') {
          this.props.callback(event);
          this.ignoreBlur = true;
          this.DOMRef.blur();
        }
        break;
    }

  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isStatic) {
      this.setState({
        value: nextProps.initialValue
      });
    }
  }

  render() {

    let validationState = this.props.validationCallback();
    let label = this.props.label? <ControlLabel>{this.props.label}</ControlLabel> : '';
    let helpBlock = this.props.help? <HelpBlock>{this.props.help}</HelpBlock> : '';

    if (this.props.isStatic) {
      return (
        <FormGroup controlId="inputFormGroup" validationState={validationState}>
          {label}
          <FormControl.Static>{this.props.initialValue}</FormControl.Static>
          {helpBlock}
        </FormGroup>
      );
    }

    return (
      <FormGroup
        validationState={validationState}
      >
      <Col smOffset={this.props.smOffset} sm={this.props.sm}>
          {label}
          <FormControl type={this.props.type} name={this.props.name}
            placeholder={this.props.placeholder}
            onBlur={(event) => this.handleChange(event)}
            onKeyPress={(event) => this.handleChange(event)}
            onChange={(event) => {
              this.ignoreBlur = false;
              this.setState({
                value: event.target.value
              });
            }}
            inputRef={(reference) => this.DOMRef = reference}
            value={this.state.value}
            style={this.props.customStyle}
            autoComplete={this.props.autoComplete}/>
          {helpBlock}
      </Col>
      </FormGroup>
    );
  }
}

Input.defaultProps = {
  smOffset: 0,
  sm: 12,
  name: 'default',
  isStatic: false,
  autoComplete: 'off',
  type: 'text',
  label: '',
  help: '',
  initialValue: '',
  customStyle: {
    'marginLeft': 'auto',
    'marginRight': 'auto'
  },
  validationCallback: () => null,
  callback: () => {}
};

export default Input;

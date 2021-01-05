/* eslint-disable no-console */
import React from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, ButtonField,
} from '../../components';
import * as constants from '../../config/constants';

const schema = yup.object().shape({
  Name: yup.string().required('Name is required').min(3, 'Invalid name'),
  sports: yup.string().required('Sport is a required field'),
  cricket: yup.string().when('sports', { is: 'Cricket', then: yup.string().required('Select an option') }),
  football: yup.string().when('sports', { is: 'Football', then: yup.string().required('Select an option') }),
});
class InputDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      sports: '',
      football: '',
      cricket: '',
      blur: {
        Name: false,
        sports: false,
        football: false,
        cricket: false,
      },
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSportsChange = this.handleSportsChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.hasError = this.hasError.bind(this);
    this.isTouched = this.isTouched.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({ Name: event.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSportsChange = (event) => {
    this.setState({ sports: event.target.value, football: '', cricket: '' }, () => {
      console.log(this.state);
    });
  }

  handleFootballChange = (event) => {
    this.setState({ football: event.target.value }, () => {
      console.log(this.state);
    });
  }

  handleCricketChange = (event) => {
    this.setState({ cricket: event.target.value }, () => {
      console.log(this.state);
    });
  }

  hasError = () => {
    try {
      return !schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
  }

  handleBlur =(field) => {
    const { blur } = this.state;
    this.setState({ blur: { ...blur, [field]: true } }, () => {
    });
  }

  isTouched = () => {
    const { blur } = this.state;
    return (blur.Name || blur.sports || blur.cricket || blur.football);
  }

  getError = (field) => {
    const { blur } = this.state;
    if (blur[field] && this.hasError) {
      try {
        schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  }

  render() {
    const {
      Name, sports, football, cricket,
    } = this.state;
    return (
      <>
        <p style={{ marginLeft: '10px' }}><b>Name</b></p>
        <TextField
          defaultvalue={Name}
          error={this.getError('Name')}
          onChange={this.handleNameChange}
          onBlur={() => this.handleBlur('Name')}
        />
        <p style={{ marginLeft: '10px' }}><b>Select the game you play?</b></p>
        <SelectField
          value={sports}
          error={this.getError('sports')}
          options={constants.sports}
          onChange={this.handleSportsChange}
          onBlur={() => this.handleBlur('sports')}
        />
        {
          sports === 'Football' ? (
            <>
              <p style={{ marginLeft: '10px' }}><b>What do you do?</b></p>
              <RadioGroup
                value={football}
                options={constants.Football}
                error={this.getError('football')}
                onChange={this.handleFootballChange}
                onBlur={() => this.handleBlur('football')}
              />
            </>
          )
            : <p />
        }
        {
          sports === 'Cricket' ? (
            <>
              <p style={{ marginLeft: '10px' }}><b>What do you do?</b></p>
              <RadioGroup
                value={cricket}
                options={constants.Cricket}
                error={this.getError('cricket')}
                onChange={this.handleCricketChange}
                onBlur={() => this.handleBlur('cricket')}
              />
            </>
          )
            : <p />
        }
        <ButtonField value="Cancel" onClick={() => {}} />
        <ButtonField
          value="Submit"
          onClick={() => {}}
          disabled={this.hasError() || !this.isTouched}
          color={this.hasError() || !this.isTouched}
        />
      </>
    );
  }
}

export default InputDemo;

/* eslint-disable no-console */
import React from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import * as constants from '../../config/constants';

class InputDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      Name: '', sports: '', football: '', cricket: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSportsChange = this.handleSportsChange.bind(this);
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

  render() {
    const { Name, sports } = this.state;
    return (
      <>
        <p><b>Name</b></p>
        <TextField defaultvalue={Name} error="" onChange={this.handleNameChange} />
        <p><b>Select the game you play?</b></p>
        <SelectField value={sports} error="" options={constants.sports} onChange={this.handleSportsChange} />
        <p><b>What do you do?</b></p>
        {
          sports === 'Football' ? <RadioGroup value="" options={constants.Football} error="" onChange={this.handleFootballChange} />
            : <p />
        }
        {
          sports === 'Cricket' ? <RadioGroup value="" options={constants.Cricket} error="" onChange={this.handleCricketChange} />
            : <p />
        }
      </>
    );
  }
}

export default InputDemo;

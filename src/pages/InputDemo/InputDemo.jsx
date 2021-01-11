/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, ButtonField, RadioGroup,
} from '../../components';

const schema = yup.object().shape({
  name: yup.string().required('Name is Required').min(3, 'Minimum 3 characters'),
  sports: yup.string().required('Sport is a Required Field'),
  cricket: yup.string().when('sports', { is: 'CRICKET', then: yup.string().required('Choose an option') }),
  football: yup.string().when('sports', { is: 'FOOTBALL', then: yup.string().required('Choose an option') }),
});

const InputDemo = () => {
  const [state, setState] = useState({
    name: '', sports: '', cricket: '', football: '',
  });

  const [blur, setBlur] = useState({
    name: false, sports: false, cricket: false, football: false,
  });

  const handleNameChange = (event) => {
    setState({ ...state, name: event.target.value });
  };

  const handleSportChange = (event) => {
    setState({
      ...state, sports: event.target.value, cricket: '', football: '',
    });
  };

  const handleCricketChange = (event) => {
    setState({ ...state, cricket: event.target.value });
  };

  const handleFootballChange = (event) => {
    setState({ ...state, football: event.target.value });
  };

  const hasError = () => {
    try {
      return !schema.validateSync(state);
    } catch (err) {
      return true;
    }
  };

  const handleBlur = (field) => {
    setBlur({ ...blur, [field]: true });
  };

  const isTouched = () => (blur.name || blur.sports || blur.cricket || blur.football);

  const getError = (field) => {
    if (blur[field] && hasError) {
      try {
        schema.validateSyncAt(field, state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };

  useEffect(() => {
    console.log(state);
  });

  return (
    <>
      <p style={{ marginLeft: '10px' }}><b>Name</b></p>
      <TextField value="" label="NAME" onChange={handleNameChange} error={getError('name')} onBlur={() => handleBlur('name')} />
      <p style={{ marginLeft: '10px' }}><b>Select Sports</b></p>
      <SelectField
        value={state.sports}
        options={[
          { label: 'CRICKET', value: 'cricket' },
          { label: 'FOOTBALL', value: 'football' },
        ]}
        onChange={handleSportChange}
        error={getError('sports')}
        onBlur={() => handleBlur('sports')}
      />
      {state.sports === 'CRICKET' ? (
        <>
          <p style={{ marginLeft: '10px' }}><b>What you do.?</b></p>
          <RadioGroup
            value={state.cricket}
            options={[
              { label: 'BATSMAN', value: 'batsman' },
              { label: 'BOWLER', value: 'bowler' },
              { label: 'WICKET KEEPER', value: 'wicket keeper' },
              { label: 'ALL ROUNDER', value: 'all rounder' },
            ]}
            onChange={handleCricketChange}
            error={getError('cricket')}
            onBlur={() => handleBlur('cricket')}
          />
        </>
      ) : null }
      {state.sports === 'FOOTBALL' ? (
        <>
          <p><b>What you do.?</b></p>
          <RadioGroup
            value={state.football}
            options={[
              { label: 'ATTACKER', value: 'attacker' },
              { label: 'DEFENDER', value: 'defender' },
            ]}
            onChange={handleFootballChange}
            error={getError('football')}
            onBlur={() => handleBlur('football')}
          />
        </>
      ) : null}
      <div style={{ display: 'flex' }}>
        <ButtonField value="Cancel" color={true.toString()} />
        <ButtonField
          value="Submit"
          disabled={hasError() || !isTouched()}
          color={(!(hasError() || !isTouched())).toString()}
        />
      </div>
    </>
  );
};

export default InputDemo;

import styled from 'styled-components';

export const Input = styled.input`
    padding: 10px;
    border: 1px solid grey;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 5px;
    font-weight: bold;
    border-color: ${(prop) => (!prop.color ? '#4CAF50' : '')};
    background-color: ${(prop) => (!prop.color ? '#4CAF50' : '')};
    color: ${(prop) => (!prop.color ? '#fff' : '')};
`;

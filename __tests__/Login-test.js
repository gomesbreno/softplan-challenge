import 'react-native';
import React from 'react';
import {Login} from '../src/screens/Login';

import renderer from 'react-test-renderer';

const loginStateTypes = {
  loginSuccessful: 0,
  emptyName: 1,
  nameWithUpperCase: 2,
  nameWithOnlyBlankSpaces: 3,
  nameWithSpecialCaracteres: 4
};

it('Test valid name to login', () => {
  let LoginData = renderer.create(<Login/>).getInstance()  
  LoginData.setState({name: "breno"})
  expect(LoginData.verifyInputData()).toEqual(loginStateTypes.loginSuccessful)
})

it('Test empty name', () => {
  let LoginData = renderer.create(<Login/>).getInstance()  
  LoginData.setState({name: ""})
  expect(LoginData.verifyInputData()).toEqual(loginStateTypes.emptyName)
})

it('Test name with upper case', () => {
  let LoginData = renderer.create(<Login/>).getInstance()  
  LoginData.setState({name: "Breno"})
  expect(LoginData.verifyInputData()).toEqual(loginStateTypes.nameWithUpperCase)
})

it('Test name with only blank spaces', () => {
  let LoginData = renderer.create(<Login/>).getInstance()  
  LoginData.setState({name: "      "})
  expect(LoginData.verifyInputData()).toEqual(loginStateTypes.nameWithOnlyBlankSpaces)
})

it('Test name with special caracteres', () => {
  let LoginData = renderer.create(<Login/>).getInstance()  
  LoginData.setState({name: "breno@"})
  expect(LoginData.verifyInputData()).toEqual(loginStateTypes.nameWithSpecialCaracteres)
})
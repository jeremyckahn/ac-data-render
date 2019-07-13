import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { response } from './fixtures/contacts';

let component;

beforeEach(() => {
  jest
    .spyOn(App, 'fetchContacts')
    .mockImplementation(() => Promise.resolve(response));
  component = shallow(<App />);
});

describe('rendering', () => {
  test('renders a table', () => {
    expect(component.find('table')).toHaveLength(1);
  });

  test('renders a row for each contact', () => {
    expect(component.find('tbody tr')).toHaveLength(response.contacts.length);
  });
});

describe('data derivation', () => {
  describe('contactValue', () => {
    test('computes contact value', () => {
      expect(component.instance().contactValue(response.contacts[0])).toEqual(
        12300
      );
    });
  });
});

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
  describe('contactName', () => {
    describe('name is not available', () => {
      test('returns default value', () => {
        expect(component.instance().contactName(response.contacts[0])).toEqual(
          '-'
        );
      });
    });

    describe('name is available', () => {
      test('returns formatted name', () => {
        expect(component.instance().contactName(response.contacts[12])).toEqual(
          'Tony Gostaldo'
        );
      });
    });
  });

  describe('contactValue', () => {
    test('computes contact value', () => {
      expect(component.instance().contactValue(response.contacts[0])).toEqual(
        123.0
      );
    });
  });

  describe('contactTags', () => {
    test('computes contact tags', () => {
      expect(component.instance().contactTags(response.contacts[0])).toEqual([
        'Success!',
      ]);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { contactsResponse } from './fixtures/contacts';
import { contactResponse } from './fixtures/contact';

let component;

beforeEach(() => {
  jest
    .spyOn(App, 'fetchContacts')
    .mockImplementation(() => Promise.resolve(contactsResponse));
  component = shallow(<App />);
});

describe('rendering', () => {
  test('renders a table', () => {
    expect(component.find('table')).toHaveLength(1);
  });

  test('renders a row for each contact', () => {
    expect(component.find('tbody tr')).toHaveLength(
      contactsResponse.contacts.length
    );
  });
});

describe('data derivation', () => {
  describe('contactName', () => {
    describe('name is not available', () => {
      test('returns default value', () => {
        expect(
          component.instance().contactName(contactsResponse.contacts[0])
        ).toEqual('-');
      });
    });

    describe('name is available', () => {
      test('returns formatted name', () => {
        expect(
          component.instance().contactName(contactsResponse.contacts[12])
        ).toEqual('Tony Gostaldo');
      });
    });
  });

  describe('contactValue', () => {
    test('computes contact value', () => {
      expect(
        component.instance().contactValue(contactsResponse.contacts[0])
      ).toEqual(123.0);
    });
  });

  describe('location', () => {
    describe('location data is not available', () => {
      test('computes empty location value', () => {
        expect(
          component.instance().contactLocations(contactResponse.contact)
        ).toEqual([]);
      });
    });

    describe('location data is available', () => {
      beforeEach(() => {
        const { contact, geoAddresses, geoIps } = contactResponse;
        component.setState({ contacts: [contact], geoAddresses, geoIps });
      });

      test('computes location value', () => {
        expect(
          component.instance().contactLocations(contactResponse.contact)
        ).toEqual(['North Arnoldomouth, KY, AS']);
      });
    });
  });

  describe('contactTags', () => {
    test('computes contact tags', () => {
      expect(
        component.instance().contactTags(contactsResponse.contacts[0])
      ).toEqual(['Success!']);
    });
  });
});

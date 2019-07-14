import React, { Component } from 'react';
import './App.sass';

const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env;

const sideloadArgs = ['deals', 'geoIps.geoAddress', 'contactTags.tag'];
const limit = 100;

const url = `${REACT_APP_API_URL}?include=${[
  sideloadArgs.join(','),
]}&limit=${limit}`;

export default class App extends Component {
  state = {
    contacts: [],
    contactTags: [],
    geoAddresses: [],
    geoIps: [],
    deals: [],
    tags: [],
  };

  constructor() {
    super(...arguments);

    this.hydrate();
  }

  static fetchContacts = () =>
    fetch(url, {
      method: 'GET',
      headers: {
        // Ideally REACT_APP_API_KEY would be provided by some sort of session
        // broker, but that is out of scope for this project.
        'Api-Token': REACT_APP_API_KEY,
        'x-requested-with': 'xhr',
        'Content-Type': 'application/json',
      },
    })
      .catch(() => {})
      .then(res => res.json());

  async hydrate() {
    try {
      const {
        contacts,
        contactTags,
        geoAddresses,
        geoIps,
        deals,
        tags,
      } = await App.fetchContacts();

      this.setState({
        contacts,
        contactTags,
        geoAddresses,
        geoIps,
        deals,
        tags,
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @param {Object} contact
   * @returns {string}
   */
  contactAvatar = ({ firstName, lastName }) => {
    return firstName && lastName ? `${firstName[0]}${lastName[0]}` : '';
  };

  /**
   * @param {Object} contact
   * @returns {string}
   */
  contactName = ({ firstName, lastName }) => {
    return firstName || lastName ? `${firstName} ${lastName}` : '-';
  };

  /**
   * @param {Object} contact
   * @returns {number}
   */
  contactValue = contact =>
    contact.deals.reduce((acc, dealId) => {
      const deal = this.state.deals.find(({ id }) => id === dealId);

      return deal ? acc + Number(deal.value) : 0;
    }, 0) / 100;

  /**
   * @param {Object} contact
   * @returns {Array.<string>}
   */
  contactLocations = contact =>
    contact.geoIps.reduce((acc, geoIp) => {
      const geoIpObject = this.state.geoIps.find(({ id }) => id === geoIp);

      if (geoIpObject) {
        const { geoAddress: geoAddressId } = geoIpObject;

        const { city, state, country2 } = this.state.geoAddresses.find(
          ({ id }) => id === geoAddressId
        );

        acc.push([city, state, country2].join(', '));
      }

      return acc;
    }, []);

  /**
   * @param {Object} contact
   * @returns {Array.<string>}
   */
  contactTags = contact =>
    (contact.contactTags || []).map(contactTag => {
      const { tag: tagId } = this.state.contactTags.find(
        ({ id }) => id === contactTag
      );
      const { tag } = this.state.tags.find(({ id }) => id === tagId);

      return tag;
    });

  render() {
    const {
      state: { contacts },
    } = this;

    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Contact</th>
              <th>Total Value</th>
              <th>Location</th>
              <th>Deals</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, i) => (
              <tr key={i}>
                <td className="name">
                  <span className="avatar" aria-hidden="true">
                    {this.contactAvatar(contact)}
                  </span>
                  <span className="full-name">{this.contactName(contact)}</span>
                </td>
                <td>${this.contactValue(contact).toLocaleString()}</td>
                {/*
                The use case for displaying multiple locations is unknown, so just display the first one.
                */}
                <td>{this.contactLocations(contact)[0] || '-'}</td>
                <td className="deals">{contact.deals.length}</td>
                <td>{this.contactTags(contact).join(', ') || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

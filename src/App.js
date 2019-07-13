import React, { Component } from 'react';
import './App.sass';

const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env;

const sideloadArgs = ['deals', 'geoIps.geoAddress', 'contactTags.tag'];
const url = `${REACT_APP_API_URL}?include=${[sideloadArgs.join(',')]}`;

export default class App extends Component {
  state = {
    contacts: [],
    contactTags: [],
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
    const { contacts, contactTags, deals, tags } = await App.fetchContacts();

    this.setState({ contacts, contactTags, deals, tags });
  }

  /**
   * @param {Object} contact
   * @returns {number}
   */
  contactValue = contact =>
    contact.deals.reduce(
      (acc, dealId) =>
        acc + Number(this.state.deals.find(({ id }) => id === dealId).value),
      0
    ) / 100;

  contactTags = contact =>
    contact.contactTags.map(contactTag => {
      const { tag: tagId } = this.state.contactTags.find(
        ({ id }) => id === contactTag
      );
      const { tag } = this.state.tags.find(({ id }) => id === tagId);

      return tag;
    });

  render() {
    const {
      state: { contacts, contactTags, deals, tags },
    } = this;

    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Contact Name</th>
              <th>Total Value</th>
              <th>Location</th>
              <th>Deals</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, i) => (
              <tr key={i}>
                <td>{`${contact.firstName} ${contact.lastName}`}</td>
                <td>${this.contactValue(contact).toLocaleString()}</td>
                {/*
                Location data does not appear to be available in the API
                response, so short of guessing how to implement it, it is left
                blank here.
                */}
                <td>(Unavailable)</td>
                <td>{contact.deals.length}</td>
                <td>{this.contactTags(contact).join(', ') || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts && (
          <pre>
            {JSON.stringify({ contacts, contactTags, deals, tags }, null, 2)}
          </pre>
        )}
      </div>
    );
  }
}

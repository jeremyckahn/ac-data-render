import React, { Component } from 'react';
import './App.sass';

const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env;

const sideloadArgs = ['deals'];
const url = `${REACT_APP_API_URL}?include=${[sideloadArgs.join(',')]}`;

export default class App extends Component {
  state = {
    contacts: [],
    deals: [],
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

  /**
   * @param {Object} contact
   * @returns {number}
   */
  contactValue = contact =>
    contact.deals.reduce(
      (acc, dealId) =>
        acc + Number(this.state.deals.find(({ id }) => id === dealId).value),
      0
    );

  async hydrate() {
    const { contacts, deals } = await App.fetchContacts();

    this.setState({ contacts, deals });
  }

  render() {
    const {
      state: { contacts, deals },
    } = this;

    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Contact Name</th>
              <th>Total Value</th>
              <th>Location Deals</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, i) => (
              <tr key={i}>
                <td>{`${contact.firstName} ${contact.lastName}`}</td>
                <td>{this.contactValue(contact)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts && <pre>{JSON.stringify({ contacts, deals }, null, 2)}</pre>}
      </div>
    );
  }
}

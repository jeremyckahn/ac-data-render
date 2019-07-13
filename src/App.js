import React, { Component } from "react";
import "./App.sass";

const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env;

export default class App extends Component {
  state = {
    contacts: []
  };

  constructor() {
    super(...arguments);

    this.hydrate();
  }

  static fetchContacts = () =>
    fetch(REACT_APP_API_URL, {
      method: "GET",
      headers: {
        // Ideally REACT_APP_API_KEY would be provided by some sort of session
        // broker, but that is out of scope for this project.
        "Api-Token": REACT_APP_API_KEY,
        "x-requested-with": "xhr",
        "Content-Type": "application/json"
      }
    })
      .catch(() => {})
      .then(res => res.json());

  async hydrate() {
    const { contacts } = await App.fetchContacts();

    this.setState({ contacts });
  }

  render() {
    const {
      state: { contacts }
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
            {contacts.map(({ firstName, lastName }, i) => (
              <tr key={i}>
                <td>{`${firstName} ${lastName}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts && <pre>{JSON.stringify(contacts, null, 2)}</pre>}
      </div>
    );
  }
}

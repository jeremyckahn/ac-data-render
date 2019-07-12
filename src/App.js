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

  fetchContacts = () =>
    fetch(REACT_APP_API_URL, {
      method: "GET",
      headers: {
        // Ideally REACT_APP_API_KEY would be provided by some sort of session
        // broker, but that is out of scope for this project.
        "Api-Token": REACT_APP_API_KEY,
        "x-requested-with": "xhr"
      }
    }).then(res => res.json());

  async hydrate() {
    const { contacts } = await this.fetchContacts();

    this.setState({ contacts });
  }

  render() {
    const {
      state: { contacts }
    } = this;
    return (
      <div className="App">
        {contacts && <pre>{JSON.stringify(contacts, null, 2)}</pre>}
      </div>
    );
  }
}

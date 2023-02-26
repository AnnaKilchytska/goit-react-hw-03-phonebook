import { nanoid } from 'nanoid';

import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import contacts from '../contacts.json';

import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (contacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }

    this.setState({ contacts: contacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    if (this.state.contacts.some(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contact list!`);
      return;
    }

    contact.id = nanoid();

    console.log('contact on App', contact);
    this.setState(prevState => {
      return {
        contacts: [contact, ...prevState.contacts],
      };
    });
  };

  onFilterContacts = () => {
    return this.state.contacts.filter(contact => {
      console.log('on filter change', this.state.filter, contact);
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
  };

  changeFilter = e => {
    console.log(e.target.value);

    this.setState({ filter: e.target.value });
    console.log(this.filteredContacts);
  };

  onDeleteContact = id => {
    console.log(id);
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const filteredContacts = this.onFilterContacts();
    return (
      <div className={css.AppContainer}>
        <h1 className={css.AppTitle}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter onChange={this.changeFilter} value={this.state.filter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;

import { nanoid } from 'nanoid';

import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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

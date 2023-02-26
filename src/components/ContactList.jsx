import PropTypes from 'prop-types';

import React, { Component } from 'react';
import css from './ContactList.module.css';

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ul className={css.contactList}>
        {this.props.contacts.map(contact => {
          return (
            <li
              key={contact.id}
              id={contact.id}
              className={css.contactListItem}
            >
              <span className={css.contactListName}>{contact.name}</span>
              <span className={css.contactListNumber}>{contact.number}</span>
              <button
                className={css.deleteButton}
                type="button"
                onClick={() => this.props.onDelete(contact.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ContactList;

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import css from './Filter.module.css';

class Filter extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={css.filterContainer}>
        <input
          type="text"
          onChange={this.props.onChange}
          value={this.props.value}
          placeholder="Start typing to find a contact"
        />
      </div>
    );
  }
}

export default Filter;

/**
 * Created by Vadym Yatsyuk on 26.08.17
 */

import React from 'react';
import PropTypes from 'prop-types';

export class Link extends React.Component {
  static propTypes = {
    link: PropTypes.string,
    title: PropTypes.string
  };

  render() {
    const url = new URL(this.props.link);
    return (
      <div>
        <a href={ this.props.link }>{ this.props.title }</a><a href={ url.origin }>({ url.hostname })</a>
      </div>
    )
  }
}
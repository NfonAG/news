/**
 * Created by Vadym Yatsyuk on 26.08.17
 */
import React from 'react';
import PropTypes from 'prop-types';

import { News } from '../news/news';

export class NewsList extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onLiked: PropTypes.func.isRequired
  };

  render() {
    const news = this.props.items.map((newsItem, i) => {
      return <News key={ newsItem._id } item={ newsItem } index={ i } onLiked={ this.props.onLiked(newsItem) } />;
    });

    return (
      <ul>
        { news }
      </ul>
    );
  }
}
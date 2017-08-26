/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NewsService } from '../news.service';
import { Link } from '../link/link';
import { LIKED_KEY } from '../constants';

export class News extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number,
    onLiked: PropTypes.func
  };

  constructor() {
    super();

    this.state = {
      inProgress: false
    };
    this.newsService = new NewsService();
    this.like = this.like.bind(this);
  }

  set inProgress(inProgress) {
    this.setState({
      inProgress
    });
  }

  like() {
    this.inProgress = true;
    let liked = JSON.parse(localStorage.getItem(LIKED_KEY)) || [];

    if (liked.indexOf(this.props.item._id) !== -1) {
      this.inProgress = false;
      return;
    }

    this.newsService
      .like(this.props.item._id)
      .then(() => {
        liked.push(this.props.item._id);
        localStorage.setItem(LIKED_KEY, JSON.stringify(liked));

        this.props.onLiked();

        this.inProgress = false;
      });
  }

  render() {
    let btnLike = <button onClick={ this.like } type="button" disabled={ this.state.inProgress }>Like</button>;

    return (
      <li>
        <div>
          <Link title={ this.props.item.title } link={ this.props.item.link } />
        </div>
        <div>
          { btnLike } {this.props.item.likes } Likes, By { this.props.item.nickname } <NavLink to={ `/news/${ this.props.item._id }` }>Comment ({ this.props.item.comments })</NavLink>
        </div>
      </li>
    );
  }
}
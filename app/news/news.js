/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import { NewsService } from '../services/news.service';
import { Link } from '../link/link';
import { LIKED_KEY } from '../constants';
import { StorageService } from '../services/storage.service';

import './news.scss';

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

    this.like = this.like.bind(this);
  }

  set inProgress(inProgress) {
    this.setState({
      inProgress
    });
  }

  like() {
    this.inProgress = true;
    let liked = StorageService.getLiked();

    if (liked.indexOf(this.props.item._id) !== -1) {
      this.inProgress = false;
      return;
    }

    NewsService
      .like(this.props.item._id)
      .then(() => {
        liked.push(this.props.item._id);
        StorageService.liked = liked;

        this.props.onLiked();

        this.inProgress = false;
      });
  }

  hasLike() {
    return StorageService.getLiked().indexOf(this.props.item._id) !== -1;
  }

  render() {
    let created = moment(this.props.item.createdAt);
    const hasLike = this.hasLike();
    let index = null;

    if (this.props.index) {
      index = (
        <div className="index">
          { this.props.index }.
        </div>
      );
    }

    if (Math.abs(created.diff()) > 1000 * 60 * 60 * 24) {
      created = created.format("H:mm, Do MMMM YYYY");
    } else {
      created = created.fromNow();
    }

    return (
      <li className="news-item-component">
        { index }
        <div>
          <button onClick={ this.like }
                  type="button"
                  disabled={ this.state.inProgress || hasLike }
                  className={ (hasLike ? 'active' : '') }
          >
            +1
          </button>
        </div>
        <div>
          <div>
            <Link title={ this.props.item.title } link={ this.props.item.link } />
          </div>
          <div className="subtitle">
            {this.props.item.likes } Likes, By { this.props.item.nickname }, { created } | <NavLink to={ `/news/${ this.props.item._id }` }>Comment ({ this.props.item.comments })</NavLink>
          </div>
        </div>
      </li>
    );
  }
}
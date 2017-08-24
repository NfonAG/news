/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

import { NewsService } from '../news.service';

export class News extends React.Component {
  constructor() {
    super();

    this.state = {
      inProgress: false
    };
    this.newsService = new NewsService();
    this.like = this.like.bind(this);
  }

  updateLikeInProgress(inProgress) {
    this.setState({
      inProgress
    });
  }

  like() {
    this.updateLikeInProgress(true);

    this.newsService
      .like(this.props.item._id)
      .then(() => {

        this.updateLikeInProgress(false);
      });
  }

  render() {
    let btnLike = <button onClick={ this.like } type="button" disabled={ this.state.inProgress }>Like</button>;

    return (
      <li>
        <div>
          { this.props.item.title }
        </div>
        <div>
          { btnLike } {this.props.item.likes } Likes, By { this.props.item.nickname } <NavLink to={ `/news/${ this.props.item._id }` }>Comment</NavLink>
        </div>
      </li>
    )
  }
}
/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { NewsService } from '../services/news.service';
import { SubmitForm } from './submit-form/submit-form';
import './submit.scss';

export class Submit extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      isSending: false,
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  createNews(news) {
    this.updateSending(false);

    NewsService
      .create(news)
      .then(() => {
        this.updateSending(false);
        this.props.history.push('/new');
      });
  }

  updateSending(isSending) {
    this.setState({
      isSending
    });
  }

  onSubmit(news) {
    this.createNews(news);
  }

  render() {
    return (
      <div className="submit-component">
        <h2>Submit new link</h2>
        <SubmitForm onSubmit={ this.onSubmit } />
      </div>
    );
  }
}
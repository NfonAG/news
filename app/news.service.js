/**
 * Created by Vadym Yatsyuk on 24.08.17
 */
import { API_URL } from './constants';

export class NewsService {
  constructor() {
    this.NEWS_URL = `${ API_URL }/news`;
  }

  request(url) {
    return fetch(url)
      .then(response => {
        return response.json();
      });
  }

  get(sort) {
    let url = this.NEWS_URL;
    if (sort) {
      url += `?sort=${ sort }`
    }

    return this.request(url);
  }

  getTop() {
    return this.get('top');
  }

  getNew() {
    return this.get('new');
  }

  getById(id) {
    return this.request(`${ this.NEWS_URL }/${ id }`);
  }

  create(data) {
    return fetch(this.NEWS_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      });
  }

  like(id) {
    return fetch(`${ this.NEWS_URL }/${ id }/likes`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(response => {
        return response.json();
      });
  }

  createComment(newsId, comment) {
    return fetch(`${ this.NEWS_URL }/${ newsId }/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      });
  }
}
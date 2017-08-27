/**
 * Created by Vadym Yatsyuk on 24.08.17
 */
import { API_URL } from '../constants';

const NEWS_URL = `${ API_URL }/news`;
export class NewsService {
  static request(url) {
    return fetch(url)
      .then(response => {

        if (response.status >= 400) {
          throw new Error();
        }
        return response.json();
      });
  }

  static get(sort, page = 1) {
    let url = NEWS_URL;
    if (sort) {
      url += `?sort=${ sort }&page=${ page }`;
    }

    return NewsService.request(url);
  }

  static getTop(page) {
    return NewsService.get('top', page);
  }

  static getNew(page) {
    return NewsService.get('new', page);
  }

  static getById(id) {
    return NewsService.request(`${ NEWS_URL }/${ id }`);
  }

  static create(data) {
    return fetch(NEWS_URL, {
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

  static like(id) {
    return fetch(`${ NEWS_URL }/${ id }/likes`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(response => {
        return response.json();
      });
  }

  static createComment(newsId, commentId, comment) {
    let url = `${ NEWS_URL }/${ newsId }/comments`;

    if (commentId) {
      url += `/${ commentId }`;
    }

    return fetch(url, {
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

  static getComments(newsId, page = 1) {
    return NewsService.request(`${ NEWS_URL }/${ newsId }/comments?page=${ page }`);
  }
}
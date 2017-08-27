/**
 * Created by Vadym Yatsyuk on 27.08.17
 */

import { LIKED_KEY, NICKNAME_KEY } from '../constants';

export class StorageService {
  static getLiked() {
    const likedString = localStorage.getItem(LIKED_KEY);
    try {
      const liked = JSON.parse(likedString);

      if (liked instanceof Array) {
        return liked;
      }
    } catch (e) {}

    return [];
  }

  static set liked(value) {
    localStorage.setItem(LIKED_KEY, JSON.stringify(value));
  }

  static get nickname() {
    return localStorage.getItem(NICKNAME_KEY);
  }

  static set nickname(value) {
    localStorage.setItem(NICKNAME_KEY, value);
  }
}
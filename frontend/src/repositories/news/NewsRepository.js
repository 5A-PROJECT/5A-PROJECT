import axios from 'axios';
import { BASE_URL } from '../../constants';

class NewsRepository {
  URL = `${BASE_URL}/news`;
  constructor(url) {
    this.URL = url || this.URL;
  }

  // 로그인
  getNews(token, keyword) {
    return axios.get(`${this.URL}/news/`, {
      params: {
        query: keyword,
      },
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }
}

export default new NewsRepository();

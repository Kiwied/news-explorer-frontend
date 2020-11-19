class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponseData(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password, name })
    })
      .then(res => this._checkResponseData(res))
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
      .then(res => this._checkResponseData(res))
      .then(data => data.token && localStorage.setItem('token', data.token))
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => this._checkResponseData(res))
  }

  getSavedArticles(token) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => this._checkResponseData(res))
  }

  saveArticle(token, { keyword, title, text, date, source, link, image }) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ keyword, title, text, date, source, link, image })
    })
      .then(res => this._checkResponseData(res))
  }

  deleteArticle(token, id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => this._checkResponseData(res))
  }
}

export const mainApi = new MainApi({
  baseUrl: 'https://www.api.news-kw.students.nomoreparties.xyz',
  headers: {
    "Content-Type": "application/json"
  }
});

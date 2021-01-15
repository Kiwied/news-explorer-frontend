export default function getNews(keyword) {
    const date = new Date();
    const to = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // today
    date.setDate(date.getDate() - 7);
    const from = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // week ago

    return fetch('https://newsapi.org/v2/everything?' +
      `q=${keyword}` +
      `&from=${to}` +
      `&to=${from}` +
      '&sortBy=popularity' +
      '&pageSize=100' +
      '&apiKey=b0a61aa3ec9e4a549eed3eabd8364449')
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}


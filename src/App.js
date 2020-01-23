import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import cssStyles from './App.module.scss';

const apiKey = '9wur7sdh84azzazdt3ye54k4';

const generateNewsList = newsList => {
  let newsContent;
  if (newsList && Array.isArray(newsList) && newsList.length > 0) {
    newsContent = (
      <>
        {
          newsList.map((newsItem, index) => {
            const newsTitle = newsItem.webTitle;
            const newsDescription = newsItem.fields.trailText || '';
            return (
              <Fragment key={index}>
                <article>
                  <h4>{ newsTitle }</h4>
                  <p>{ newsDescription }</p>
                </article>
              </Fragment>
            );
          })
        }
      </>
    );
  }
  return newsContent;
};

function App() {
  const searchType = 'uk-news';
  // const additionalElements = 'image';
  const additionalFields = 'trailText';
  const [news, setNews] = useState([]);

  useEffect(  () => {
    // const url = `https://content.guardianapis.com/search?q=${searchType}&order-by=newest&show-fields=${additionalFields}&show-elements=${additionalElements}&api-key=${apiKey}`;
    const url = `https://content.guardianapis.com/search?q=${searchType}&order-by=newest&show-fields=${additionalFields}&api-key=${apiKey}`;
    const fetchNews = async () => {
      return axios({
        method: 'get',
        url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        timeout: 20000,
      });
    };
    fetchNews()
      .then(data => {
        if (data.status === 200) {
          const response = data.data.response;
          if (typeof response.status === 'string' && response.status === 'ok' && Array.isArray(response.results)) {
            setNews(response.results);
          }  else {
            throw new Error('No data returned');
          }
        }
      })
      .catch(err => {
        console.log('ERR', err);
      });

  }, []);
  return (
    <>
      <header>
        <h1>Tabbed Component</h1>
      </header>
      <main className={ cssStyles.app }>
        <h3>UK News</h3>
        <section>
          { generateNewsList(news) }
        </section>
      </main>
    </>
  );
}

export default App;
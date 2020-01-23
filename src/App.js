import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cssStyles from './App.module.scss';
import NewsTabItem from "./components/NewsTabItem/NewsTabItem";

const apiKey = '9wur7sdh84azzazdt3ye54k4';

const generateNewsList = newsList => {
  let newsContent;
  if (newsList && Array.isArray(newsList) && newsList.length > 0) {
    newsContent = (
      <>
        {
          newsList.map((newsItem, index) => {
            const newsTitle = `${index+1}. ${newsItem.webTitle}`;
            const newsLink = newsItem.webUrl;
            const newsDescription = newsItem.fields.trailText || '';
            return (
              <li key={index} className={ cssStyles.tabItem }>
                <NewsTabItem
                  title={ newsTitle }
                  description={ newsDescription }
                  linkURL={ newsLink }
                />
              </li>
            );
          })
        }
      </>
    );
  }
  return newsContent;
};

function App() {
  const [ selectedNewsTab, setSelectedNewsTab ] = useState('uk-new');
  const handleNewsSelection = (clickEvent) => {
    clickEvent.preventDefault();
    const newsElement = clickEvent.currentTarget;
    const newsLink = newsElement.getAttribute('href').replace(/^\//, '');
    console.log('newsLink: ', newsLink);
    setSelectedNewsTab(newsLink);
  };

  const [ news, setNews ] = useState([]);
  useEffect(  () => {
    const fetchNews = async (searchType) => {
      const additionalFields = 'trailText';
      const url = `https://content.guardianapis.com/search?q=${searchType}&order-by=newest&show-fields=${additionalFields}&api-key=${apiKey}`;
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

    fetchNews(selectedNewsTab)
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

  }, [ selectedNewsTab ]);

  const newsContent = generateNewsList(news);
  return (
    <>
      <header className={ cssStyles.header }>
        <h1>Tabbed Component</h1>
      </header>
      <main className={ cssStyles.main }>
        <nav role="navigation">
          <ul className={ cssStyles.tabNavLayout }>
            <li><h3><a href="/uk-news" onClick={ handleNewsSelection }>UK News</a></h3></li>
            <li><h3><a href="/football" onClick={ handleNewsSelection }>Football</a></h3></li>
            <li><h3><a href="/travel" onClick={ handleNewsSelection }>Travel</a></h3></li>
          </ul>
        </nav>
        <section>
          <ol className={ cssStyles.tabLayout }>
            { newsContent }
          </ol>
        </section>
      </main>
    </>
  );
}

export default App;
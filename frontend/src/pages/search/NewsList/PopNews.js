import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '../Utils/Pagination';
import ShowAllNews from './ShowAllNews';
import axios from 'axios';
import { BASE_URL } from '../../../constants';

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem;
`;

const PageWrapper = styled.ul`
  display: flex;
`;

function PopNewsList(props) {
  const [popnews, setPopNews] = useState([]);
  useEffect(() => {
    const url = `${BASE_URL}/news/`;
    const token = sessionStorage.getItem('access_token');
    axios
      .get(url, {
        params: {
          query: '삼성',
        },
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        let news_data = [];
        for (let i = 0; i < res.data.news.length; i++) {
          news_data.push({
            news: res.data.news[i],
            links: res.data.links[i],
            results: res.data.results[i],
          });
        }
        setPopNews(news_data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const PageList = () => {};

  return (
    <NewsWrapper>
      {popnews.map((popnews, index) => (
        <ShowAllNews key={index} news={popnews} />
      ))}
      <PageWrapper>
        {PageList}
        <Pagination pageNum={105} start={101} end={111} />
      </PageWrapper>
    </NewsWrapper>
  );
}

export default PopNewsList;

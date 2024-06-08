import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import Nav from '@/parts/nav/Nav';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const filterAnonymousPosts = async () => {
  const db = getFirestore();

  // 'posts' 컬렉션을 쿼리
  const postQuery = query(
    collection(db, 'posts'),
    where('category', '==', '익명 게시판')
  );
  const postSnapshot = await getDocs(postQuery);

  const posts = postSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return posts;
};

function Anonymous() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['anonymousPosts'],
    queryFn: filterAnonymousPosts
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div role="alert">{error.toString()}</div>;
  }

  return (
    <>
      <Helmet>
        <title>LIVE:ON - 익명 게시판</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="LIVE:ON 익명 게시판 페이지"
        />
        <meta
          property="twitter:title"
          content="LIVE:ON 익명 게시판 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://r09m.vercel.app/anonymous" />
        <meta
          property="og:description"
          content="익명 게시판에서 다양한 글을 확인하고 참여할 수 있는 페이지입니다."
        />
        <meta
          name="description"
          content="익명 게시판에서 다양한 글을 확인하고 참여할 수 있는 페이지입니다."
        ></meta>
        <meta property="og:image" content="ribbon.png" />
        <meta property="og:article:author" content="LIVE:ON" />
      </Helmet>
      <h1 className="sr-only">LIVE:ON</h1>

      <div className="bg-line-200 py-2">
        <div className="px-4">
          <Header />
          <h2 className="pageTitle">익명 게시판</h2>
        </div>
        <ul>
          {data.map(
            ({ id, title, content }) => (
              <li className="rounded-2xl p-5 m-6 bg-white" key={id}>
                <Link to={`/posts/anonymous/${id}`}>
                  <div className="relative mb-4">
                    <h3 className="text-greenishgray-700 font-semibold mt-5">
                      {title}
                    </h3>
                    <p className="text-sm my-2">{content}</p>
                  </div>
                </Link>
              </li>
            )
          )}
        </ul>
        <Nav />
      </div>
    </>
  );
}

export default Anonymous;

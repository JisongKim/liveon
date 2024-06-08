import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import Nav from '@/parts/nav/Nav';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const filterFreeBoardPosts = async () => {
  const db = getFirestore();

  // 'post' 컬렉션을 쿼리
  const postQuery = query(
    collection(db, 'posts'),
    where('category', '==', '자유 게시판')
  );
  const postSnapshot = await getDocs(postQuery);

  const posts = [];
  
  // 'users' 컬렉션의 모든 사용자 데이터를 가져옴
  const userQuery = query(collection(db, 'users'));
  const userSnapshot = await getDocs(userQuery);
  const userMap = {};
  userSnapshot.forEach(doc => {
    userMap[doc.id] = doc.data();
  });

  postSnapshot.forEach(doc => {
    const postData = doc.data();
    const userData = userMap[postData.user_id] || {}; // user_id에 해당하는 사용자 데이터 가져오기
    posts.push({
      id: doc.id,
      ...postData,
      nickname: userData.nickname, // 사용자 데이터에서 닉네임 추가
      region: userData.region, // 사용자 데이터에서 지역 추가
    });
  });

  return posts;
};

function FreeBoard() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['freeBoardPosts'],
    queryFn: filterFreeBoardPosts
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
        <title>LIVE:ON - 자유게시판</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="LIVE:ON 자유게시판 페이지"
        />
        <meta
          property="twitter:title"
          content="LIVE:ON 자유게시판 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://r09m.vercel.app/freeboard" />
        <meta
          property="og:description"
          content="자유게시판에서 다양한 글을 확인하고 참여할 수 있는 페이지입니다."
        />
        <meta
          name="description"
          content="자유게시판에서 다양한 글을 확인하고 참여할 수 있는 페이지입니다."
        ></meta>
        <meta property="og:image" content="ribbon.png" />
        <meta property="og:article:author" content="LIVE:ON" />
      </Helmet>
      <h1 className="sr-only">LIVE:ON</h1>

      <div className="bg-line-200 py-2">
        <div className="px-4">
          <Header />
          <h2 className="pageTitle">자유게시판</h2>
        </div>
        <ul>
          {data.map(
            ({
              id,
              title,
              content,
              user_id,
              nickname,
              region
            }) => (
              <li className="rounded-2xl p-5 m-6 bg-white" key={id}>
                <Link to={`/posts/${id}`}>
                  <div className="relative mb-4">
                    <h3 className="text-greenishgray-700 font-semibold mt-5">
                      {title}
                    </h3>
                    <p className="text-sm my-2">{content}</p>
                  </div>
                  <div className="flex justify-between text-xs">
                    <div>
                      <span className="text-greenishgray-600">
                        {region}
                      </span>
                      <span className="text-primary-500 font-bold ml-2">
                        {nickname}
                      </span>
                    </div>
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

export default FreeBoard;

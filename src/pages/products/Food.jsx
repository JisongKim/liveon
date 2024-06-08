import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';

import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import Nav from '@/parts/nav/Nav';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const filterFoodProducts = async () => {
  const db = getFirestore();

  // 'share' 컬렉션을 쿼리
  const shareQuery = query(
    collection(db, 'share'),
    where('category', '==', '배달쉐어'),
    limit(50)
  );
  const shareSnapshot = await getDocs(shareQuery);

  const products = [];
  
  // 'users' 컬렉션의 모든 사용자 데이터를 가져옴
  const userQuery = query(collection(db, 'users'));
  const userSnapshot = await getDocs(userQuery);
  const userMap = {};
  userSnapshot.forEach(doc => {
    userMap[doc.id] = doc.data();
  });

  console.log('User Map:', userMap); // 사용자 데이터 출력


  shareSnapshot.forEach(doc => {
    const productData = doc.data();
    const userData = userMap[productData.user_id] || {}; // user_id에 해당하는 사용자 데이터 가져오기
    products.push({
      id: doc.id,
      ...productData,
      nickname: userData.nickname, // 사용자 데이터에서 닉네임 추가
      region: userData.region, // 사용자 데이터에서 지역 추가
    });
  });
  console.log('Products:', products); // 상품 데이터 출력

  return products;
};

function Food() {
  const {isLoading, error, data, refetch} = useQuery({
    queryKey: ['deliveryShares'],
    queryFn: filterFoodProducts
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
        <title>LIVE:ON - 배달쉐어</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="LIVE:ON 배달쉐어 상품 페이지"
        />
        <meta
          property="twitter:title"
          content="LIVE:ON 배달쉐어 상품 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://r09m.vercel.app/food" />
        <meta
          property="og:description"
          content="배달쉐어 상품을 확인할 수 있는 페이지입니다. 카테고리, 상품명, 상세내용, 진행상태, 참여자 현황을 확인할 수 있습니다."
        />
        <meta
          name="description"
          content="배달쉐어 상품을 확인할 수 있는 페이지입니다. 카테고리, 상품명, 상세내용, 진행상태, 참여자 현황을 확인할 수 있습니다."
        ></meta>
        <meta property="og:image" content="ribbon.png" />
        <meta property="og:article:author" content="LIVE:ON" />
      </Helmet>
      <h1 className="sr-only">LIVE:ON</h1>

      <div className="bg-line-200 py-2">
        <div className="px-4">
          <Header />
          <h2 className="pageTitle">배달쉐어</h2>
        </div>
        <ul>
          {data.map(
            ({
              id,
              address,
              category,
              content,
              status,
              participate,
              participateNumber,
              title,
              user_id,
              nickname,
              region
            }) => (
              <li className="rounded-2xl p-5 m-6 bg-white" key={id}>
              <Link to={`/products/${id}`}>
                <span className="font-semibold bg-line-400 text-greenishgray-800 p-2 rounded-xl">
                  배달쉐어
                </span>
                <div className="relative mb-4">
                <span className={`font-bold absolute ${status === '모집중' ? 'text-primary-500' : status === '쉐어중' ? 'text-primary-300' : 'text-greenishgray-500'}`}>
                  {status}
                </span>


                  <h3 className="text-greenishgray-700 font-semibold mt-5 ml-20">
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
                <span className="text-greenishgray-600">
                  참여 인원 : {participate.length} / {participateNumber}
                </span>
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

export default Food;

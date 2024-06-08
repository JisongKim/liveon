import { useEffect } from 'react';
import { getFirestore, collection, getDocs, query, limit } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import Nav from '@/parts/nav/Nav';

const getProducts = async () => {
  const db = getFirestore();

  // 'share' 컬렉션의 전체 데이터를 가져오는 쿼리
  const shareQuery = query(
    collection(db, 'share'),
    limit(50)  // 필요한 경우 제한 설정
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

  return products;
};

function Total() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
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
        <title>LIVE:ON - 전체 쉐어글</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="자취생을 위한 커뮤니티 LIVE:ON 전체 쉐어글 페이지"
        />
        <meta
          property="twitter:title"
          content="자취생을 위한 커뮤니티 LIVE:ON 전체 쉐어글 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://r09m.vercel.app/products" />
        <meta
          property="og:description"
          content="전체 쉐어글을 확인할 수 있는 페이지입니다. 카테고리, 상품명, 상세내용, 진행상태, 참여자 현황을 확인할 수 있습니다."
        />
        <meta
          name="description"
          content="전체 쉐어글을 확인할 수 있는 페이지입니다. 카테고리, 상품명, 상세내용, 진행상태, 참여자 현황을 확인할 수 있습니다."
        ></meta>
        <meta property="og:image" content="favicon.png" />
        <meta property="og:article:author" content="Ready! Act" />
      </Helmet>
      <h1 className="sr-only">R09M</h1>

      <div className="bg-line-200 py-2">
        <div className="px-4">
          <Header />
          <h2 className="pageTitle">전체</h2>
        </div>
        <ul>
          {data.map(
            ({
              id,
              category,
              status,
              title,
              content,
              participate,
              participateNumber,
              nickname,
              region,
            }) => (
              <li className="rounded-2xl p-5 m-6 bg-white" key={id}>
                <Link to={`/products/${id}`}>
                  <span className="font-semibold bg-line-400 text-greenishgray-800 p-2 rounded-xl">
                    {category}
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
                      <span className="text-greenishgray-600">{region}</span>
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

export default Total;

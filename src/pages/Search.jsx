import React, { useEffect, useState } from 'react';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import Nav from '@/parts/nav/Nav';
import { debounce } from '@/utils/debounce';
import { numberWithComma } from '@/utils/numberWithComma';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import navStyles from '@/styles/Nav.module.css';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function Search() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    async function searchProducts() {
      if (searchData) {
        setLoading(true);
        const q = query(
          collection(db, 'share'),
          where('title', '>=', searchData),
          where('title', '<=', searchData + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        const searchList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(searchList);
        setLoading(false);
      } else {
        setData([]);
        setLoading(false);
      }
    }

    searchProducts();
  }, [searchData, db]);

  return (
    <>
      <Helmet>
        <title>LIVE:ON - 검색</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="자취생을 위한 쉐어커뮤니티 서비스 LIVE :ON 검색 페이지" />
        <meta property="twitter:title" content="자취생을 위한 쉐어커뮤니티 서비스 LIVE :ON 검색 페이지" />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://liveon.vercel.app/search" />
        <meta property="og:description" content="검색어 입력 시 키워드에 해당하는 쉐어글을 확인할 수 있습니다." />
        <meta name="description" content="검색어 입력 시 키워드에 해당하는 쉐어글을 확인할 수 있습니다." />
        <meta property="og:image" content="favicon.png" />
        <meta property="og:article:author" content="Ready! Act" />
      </Helmet>
      <h1 className="sr-only">LIVE:ON</h1>

      <div className="py-2 px-4">
        <Header />
        <h2 className="pageTitle">검색</h2>

        <label htmlFor="search" className="sr-only">검색</label>
        <Input
          id="search"
          placeholder="검색"
          className="authInput max-w-[544px]"
          defaultValue={searchData}
          onChange={debounce((e) => {
            setSearchData(e.target.value);
          }, 100)}
        />

        <h2 className="font-semibold mt-6 mb-3">검색 결과</h2>
        {loading ? (
          <Spinner />
        ) : data.length > 0 ? (
          <div className="bg-line-200 py-2">
            <ul>
              {data.map((selectedRecord) => (
                <li className="rounded-2xl p-5 m-6 bg-white" key={selectedRecord.id}>
                  <Link to={`/products/${selectedRecord.id}`}>
                    <span className="font-semibold bg-line-400 text-greenishgray-800 p-2 rounded-xl">
                      {selectedRecord.category}
                    </span>
                    <div className="relative mb-4">
                      <span className={`font-bold absolute ${selectedRecord.status === '모집중' ? 'text-primary-500' : selectedRecord.status === '쉐어중' ? 'text-primary-300' : 'text-greenishgray-500'}`}>
                        {selectedRecord.status}
                      </span>
                      <h3 className="text-greenishgray-700 font-semibold mt-5 ml-20">
                        {selectedRecord.title}
                      </h3>
                      <p className="text-sm my-2">{selectedRecord.content}</p>
                    </div>
                    <div className="flex justify-between text-xs">
                      <div>
                        <span className="text-greenishgray-600">
                          {selectedRecord.userRegion}
                        </span>
                        <span className="text-primary-500 font-bold ml-2">
                          {selectedRecord.userNickname}
                        </span>
                      </div>
                      <span className="text-greenishgray-600">
                        참여 인원 : {selectedRecord.participate ? selectedRecord.participate.length : 0} / {selectedRecord.participateNumber}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <span className="text-greenishgray-600">검색 결과가 없습니다.</span>
        )}
        <Nav searchColor="#000" searchSpan={navStyles.navSpan} />
      </div>
    </>
  );
}

export default Search;

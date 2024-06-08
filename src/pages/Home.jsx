import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Keyboard, Mousewheel } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import logo2 from '@/assets/icons/logo2.svg';
import myLocation from '@/assets/icons/myLocation.svg';
import plus from '@/assets/icons/plus.svg';
import reset from '@/assets/icons/reset.svg';
import Button from '@/components/Button';
import { category } from '@/data/category';
import { currentLocation } from '@/parts/map/currentLocation';
import { mapMark } from '@/parts/map/mapMark';
import Nav from '@/parts/nav/Nav';
import Spinner from '@/components/Spinner';
import styles from '@/styles/Home.module.css';
import navStyles from '@/styles/Nav.module.css';
import 'swiper/css';
import 'swiper/css/free-mode';

let mapCached = false;
let mapInstance = null;

async function getReadRecordList() {
  const querySnapshot = await getDocs(collection(db, 'share'));
  const readRecordList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return readRecordList;
}

function Home() {
  const mainMapRef = useRef(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);

  const { isLoading, data } = useQuery({
    queryKey: ['home'],
    queryFn: getReadRecordList,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      mapMark(mainMapRef.current, data, setSelectedRecord, selectedRecord, initialLocation);
      mapCached = true;
    }
  }, [data, selectedRecord, initialLocation]);

  useEffect(() => {
    if (!mapInstance && mainMapRef.current) {
      mapInstance = new kakao.maps.Map(mainMapRef.current, {
        center: new kakao.maps.LatLng(37.559690, 126.998518),
        level: 5,
      });
    }
  }, [mainMapRef.current]);

  return (
    <>
      <Helmet>
        <title>LIVE:ON - 홈</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="자취생을 위한 커뮤니티 LIVE:ON 메인 페이지"
        />
        <meta
          property="twitter:title"
          content="자취생을 위한 커뮤니티 LIVE:ON 메인 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://r09m.vercel.app/home" />
        <meta
          property="og:description"
          content="전체, 채소, 과일, 곡류, 육류 등 카테고리별 상품을 확인할 수 있는 메뉴와 현재 등록된 공동구매 상품의 픽업 위치를 확인할 수 있는 페이지입니다. 더하기 버튼 클릭 시 새로운 공동구매 상품을 등록할 수 있습니다."
        />
        <meta
          name="description"
          content="전체, 채소, 과일, 곡류, 육류 등 카테고리별 상품을 확인할 수 있는 메뉴와 현재 등록된 공동구매 상품의 픽업 위치를 확인할 수 있는 페이지입니다. 더하기 버튼 클릭 시 새로운 공동구매 상품을 등록할 수 있습니다."
        ></meta>
        <meta property="og:image" content="ribbon.png" />
        <meta property="og:article:author" content="LIVE:ON" />
      </Helmet>
      <div className="relative p-2">
        <h1 className="sr-only">LIVE:ON</h1>
        <Link to="/home">
          <img src={logo2} alt="리본 로고" className="w-12 h-12 m-auto" />
        </Link>
        <h2 className="text-lg font-semibold pb-4">LIVE:ON</h2>
        <h3 className="sr-only">카테고리</h3>

        <Swiper
          slidesPerView={4.5}
          spaceBetween={10}
          freeMode={true}
          keyboard={{
            enabled: true,
          }}
          mousewheel={true}
          modules={[FreeMode, Keyboard, Mousewheel]}
        >
          {category.map(({ title, path, img }) => (
            <SwiperSlide key={title}>
              <Link to={path}>
                <h4 className="sr-only">{title}</h4>
                <figure className="flex flex-col items-center m-1">
                  <img
                    src={img}
                    alt={title}
                    aria-hidden="true"
                    className="box-content w-12 h-12 rounded-1xl"
                  />
                  <figcaption className="text-greenishgray-800 font-medium text-sm">
                    {title}
                  </figcaption>
                </figure>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="relative">
          <div ref={mainMapRef} className="w-full h-[48vh] my-3">
            {isLoading && (
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-zinc-100 flex justify-center items-center">
                지도 로딩 중...
              </div>
            )}

            <motion.div
              initial={{ opacity: mapCached ? 1 : 0 }}
              animate={{ opacity: mapCached ? 1 : 1 }}
              transition={{ delay: mapCached ? 0 : 0.9 }}
              className="w-full h-[65vh]"
            >
              <Button
                type="button"
                className={`${styles.button} left-2 bottom-16 bg-white p-2`}
                onClick={() => {
                  mapMark(mainMapRef.current, data, setSelectedRecord, selectedRecord, initialLocation);
                  mapCached = true;
                }}
              >
                <h3 className="sr-only">기존 위치로 돌아가기</h3>
                <img
                  src={reset}
                  alt="기존 위치로 되돌아가기"
                  className="w-6 h-6"
                />
              </Button>
              <Button
                type="button"
                className={`${styles.button} left-2 bottom-2 bg-white p-2`}
                onClick={() => {
                  currentLocation(mapInstance, setInitialLocation);
                }}
              >
                <h3 className="sr-only">현재 위치</h3>
                <img
                  src={myLocation}
                  alt="현재 위치로 가기"
                  className="w-6 h-6"
                />
              </Button>
              <Button
                type="button"
                className={`${styles.button} right-2 bottom-2 bg-orange-300 w-12 h-12`}
              >
                <Link to="/createRoom">
                  <h3 className="sr-only">방 만들기</h3>
                  <img
                    src={plus}
                    alt="방 만들기"
                    aria-hidden="true"
                    className="w-12 h-12 p-2"
                  />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
        {selectedRecord && (
          <div className="bg-line-200 py-2">
            <ul>
              <li className="rounded-2xl p-5 m-6 bg-white" key={selectedRecord.id}>
                <Link to={`/products/${selectedRecord.id}`}>
                  <span className="font-semibold bg-line-400 text-greenishgray-800 p-2 rounded-xl">
                    배달쉐어
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
                        {selectedRecord.region}
                      </span>
                      <span className="text-primary-500 font-bold ml-2">
                        {selectedRecord.nickname}
                      </span>
                    </div>
                    <span className="text-greenishgray-600">
                      참여 인원 : {selectedRecord.participate ? selectedRecord.participate.length : 0} / {selectedRecord.participateNumber}
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Nav homeColor="#000" homeSpan={navStyles.navSpan} />
    </>
  );
}

export default Home;

import logo from '@/assets/icons/logo.svg';
import myLocation from '@/assets/icons/myLocation.svg';
import plus from '@/assets/icons/plus.svg';
import reset from '@/assets/icons/reset.svg';
import Button from '@/components/Button';
import {category} from '@/data/category';
import {currentLocation} from '@/parts/map/currentLocation';
import {mapMark} from '@/parts/map/mapMark';
import Nav from '@/parts/nav/Nav';
import styles from '@/styles/Home.module.css';
import {useEffect, useRef} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import {FreeMode, Keyboard, Mousewheel} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import navStyles from '@/styles/Nav.module.css';
import {pb} from '@/api/pocketbase';
import {useQuery} from '@tanstack/react-query';
import {motion} from 'framer-motion';

let mapCached = false;

async function getReadRecordList() {
  try {
    const readRecordList = await pb.collection('products').getFullList({
      fields: 'meetingPoint',
    });
    return readRecordList;
  } catch (error) {
    return console.error(error);
  }
}

function Home() {
  const mainMapRef = useRef(null);

  const {isLoading, data} = useQuery({
    queryKey: ['home'],
    queryFn: getReadRecordList,
    keepPreviousData: true,
  });

  useEffect(() => {
    mapMark(mainMapRef.current, data);
    mapCached = true;
  }, [data]);

  return (
    <>
      <Helmet>
        <title>R09M - 홈</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="합리적인 소비를 위한 공동구매 서비스 R09M 메인 페이지"
        />
        <meta
          property="twitter:title"
          content="합리적인 소비를 위한 공동구매 서비스 R09M 메인 페이지"
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
        <meta property="og:image" content="favicon.png" />
        <meta property="og:article:author" content="Ready! Act" />
      </Helmet>
      <div className="relative p-2">
        <h1 className="sr-only">R09M</h1>
        <Link to="/home">
          <img src={logo} alt="공구룸 로고" className="w-12 h-12 m-auto" />
        </Link>
        <h2 className="text-lg font-semibold pb-4">공구룸</h2>
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
          {category.map(({title, path, img}) => (
            <SwiperSlide key={title}>
              <Link to={path}>
                <h4 className="sr-only">{title}</h4>
                <figure className="flex flex-col items-center m-1">
                  <img
                    src={img}
                    alt={title}
                    aria-hidden="true"
                    className="box-content w-12 h-12 bg-line-400 rounded-2xl p-1 mb-2"
                  />
                  <figcaption className="text-greenishgray-800 font-medium">
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
              ref={mainMapRef}
              initial={{opacity: mapCached ? 1 : 0}}
              animate={{opacity: mapCached ? 1 : 1}}
              transition={{delay: mapCached ? 0 : 0.9}}
              className="w-full h-[65vh]"
            >
              <Button
                type="button"
                className={`${styles.button} left-2 bottom-16 bg-white p-2`}
                onClick={() => {
                  mapMark(mainMapRef.current, data);
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
                  currentLocation(mainMapRef.current);
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
                className={`${styles.button} right-2 bottom-2 bg-primary-500 w-12 h-12`}
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
        <h3 className="sr-only">메뉴</h3>
      </div>
      <Nav homeColor="#000" homeSpan={navStyles.navSpan} />
    </>
  );
}

export default Home;

import {pb} from '@/api/pocketbase';
import participateNum from '@/assets/icons/participateNum.svg';
import pickuptime from '@/assets/icons/pickuptime.svg';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import Nav from '@/parts/nav/Nav';
import {useQuery} from '@tanstack/react-query';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

const filterMeatProducts = async () => {
  const filterRecordList = await pb.collection('products').getList(1, 50, {
    filter: 'category="육류"',
    sort: '-created',
  });
  return filterRecordList.items;
};

function Meat() {
  const {isLoading, error, data, refetch} = useQuery({
    queryKey: ['products'],
    queryFn: () => filterMeatProducts(),
  });

  refetch();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div role="alert">{error.toString()}</div>;
  }

  return (
    <>
      <Helmet>
        <title>R09M - 육류</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="합리적인 소비를 위한 공동구매 서비스 R09M 육류 상품 페이지"
        />
        <meta
          property="twitter:title"
          content="합리적인 소비를 위한 공동구매 서비스 R09M 육류 상품 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://r09m.vercel.app/meat" />
        <meta
          property="og:description"
          content="공동구매 육류 상품을 확인할 수 있는 페이지입니다. 카테고리, 상품명, 상세내용, 진행상태, 픽업 일자, 참여자 현황을 확인할 수 있습니다."
        />
        <meta
          name="description"
          content="공동구매 육류 상품을 확인할 수 있는 페이지입니다. 카테고리, 상품명, 상세내용, 진행상태, 픽업 일자, 참여자 현황을 확인할 수 있습니다."
        ></meta>
        <meta property="og:image" content="favicon.png" />
        <meta property="og:article:author" content="Ready! Act" />
      </Helmet>
      <h1 className="sr-only">R09M</h1>

      <div className="bg-line-200 py-2">
        <div className="px-4">
          <Header />
          <h2 className="pageTitle">육류</h2>
        </div>
        <ul>
          {data.map(
            ({
              id,
              category,
              status,
              title,
              content,
              pickup,
              participate,
              participateNumber,
            }) => (
              <li className=" rounded-2xl p-5 m-6 bg-white" key={id}>
                <Link to={`/products/${id}`}>
                  <span className="font-semibold bg-line-400 text-greenishgray-800 p-2 rounded-xl">
                    {category}
                  </span>
                  <div className="relative mb-4">
                    {status === '대기중' ? (
                      <span className="font-bold absolute text-primary-500">
                        {status}
                      </span>
                    ) : status === '진행중' ? (
                      <span className="font-bold absolute text-map-500">
                        {status}
                      </span>
                    ) : (
                      <span className="font-bold absolute text-greenishgray-500">
                        {status}
                      </span>
                    )}
                    <h3 className="text-greenishgray-700 font-semibold mt-5 ml-20">
                      {title}
                    </h3>
                    <p className="text-sm my-2">{content}</p>
                  </div>
                  <div className="flex gap-2 justify-end text-xs text-greenishgray-600">
                    <div className="flex gap-1">
                      <img
                        src={pickuptime}
                        alt="픽업 시간"
                        className="w-4 h-4"
                      />
                      <span>{pickup.slice(5, -8).replace('-', '/')}</span>
                    </div>
                    <div className="flex gap-1">
                      <img
                        src={participateNum}
                        alt="참여 인원"
                        className="w-4 h-4"
                      />
                      <span>
                        {participate.length}/{participateNumber}
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

export default Meat;

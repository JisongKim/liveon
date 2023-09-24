import { pb } from '@/api/pocketbase';
import crownSmall from '@/assets/icons/crownSmall.svg';
import dinner from '@/assets/icons/dinner.svg';
import location from '@/assets/icons/location.svg';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { numberWithComma } from '@/utils/numberWithComma';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import DetailStatus from './DetailStatus';
import Participation from './Participation';
import SeeMore from './SeeMore';

const getDetails = async (id) => {
  return await pb.collection('products').getOne(id, {
    expand: 'creator, participate',
  });
};

function Detail() {
  const { id } = useParams();

  const handleUpdateParticipation = (newParticipation) => {
    (data) => {
      const nextData = { ...data };
      nextData.expand.participate.push(newParticipation);
      return nextData;
    };
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getDetails(id),
  });

  refetch();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div role="alert">{error.toString()}</div>;
  }

  const {
    category,
    title,
    pickup,
    meetingPoint,
    content,
    participateNumber,
    price,
    expand,
  } = data;

  const { creator, participate } = expand;

  return (
    <>
      <Helmet>
        <title>R09M - 상품 상세 페이지</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="합리적인 소비를 위한 공동구매 서비스 R09M 상세 페이지"
        />
        <meta
          property="twitter:title"
          content="합리적인 소비를 위한 공동구매 서비스 R09M 상세 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://r09m.vercel.app/products" />
        <meta
          property="og:description"
          content="공동구매 상품에 대한 상세 정보를 확인할 수 있는 페이지입니다. 생성자, 상품명, 상세내용, 진행상태, 픽업 일자, 참여자, 1인당 정산비 등을 확인할 수 있으며 참여하기 버튼 클릭 시 참여가 가능합니다."
        />
        <meta
          name="description"
          content="공동구매 상품에 대한 상세 정보를 확인할 수 있는 페이지입니다. 생성자, 상품명, 상세내용, 진행상태, 픽업 일자, 참여자, 1인당 정산비 등을 확인할 수 있으며 참여하기 버튼 클릭 시 참여가 가능합니다."
        ></meta>
        <meta property="og:image" content="favicon.png" />
        <meta property="og:article:author" content="Ready! Act" />
      </Helmet>
      <div className="px-4 py-2">
        <Header link="/products" />
      </div>
      <h1 className="sr-only">R09M</h1>
      <div className="flex justify-center mt-2">
        <DetailStatus />
      </div>
      <ul className="pl-4">
        <h2 className="sr-only">상품 정보</h2>
        <li className="flex mb-3 mt-2 items-center font-semibold text-lg justify-between">
          <figure className="flex items-center gap-3 mt-2">
            <img
              src={getPbImageURL(creator, 'photo')}
              alt={creator.name}
              aria-hidden="true"
              className="object-cover rounded-full w-14 h-14 relative"
            />
            <figcaption>{creator.name}</figcaption>
          </figure>
          <img
            src={crownSmall}
            alt="게시물 작성자"
            className="absolute mt-10 ml-10"
          />
          <SeeMore />
        </li>

        <li className="h-[350px]">
          <img
            src={getPbImageURL(data, 'uploadImage')}
            alt={title}
            className="object-cover mx-auto w-full h-full pr-4"
          />
        </li>

        <li className="mt-5">
          <div className="mb-3">
            <span className="font-semibold bg-line-400 text-greenishgray-800 p-2 rounded-xl">
              {category}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold">{title}</h3>
        </li>

        <li className="mt-9 flex items-center">
          <div className="pr-2">
            <img
              src={dinner}
              alt="시계 이모티콘"
              className="w-4 h-4 items-center"
            />
          </div>
          <div>{pickup.slice(5, -8).replace('-', '/')}</div>
        </li>

        <li className="flex items-center mt-2">
          <div className="pr-2">
            <img src={location} alt="만날 장소" className="w-4 h-4" />
          </div>
          <div>{meetingPoint}</div>
          <Link to={`/products/${id}/pickupplace`}>
            <div className="text-info-500 ml-2">픽업위치&gt;</div>
          </Link>
        </li>

        <li className="mt-7">
          <div className="pr-4">{content}</div>
        </li>

        <li className="flex items-center mt-7 pr-4 place-content-between relative">
          <div className="text-base font-bold">
            참여자 {participate.length}/{participateNumber}
          </div>

          <div className="flex justify-end pr-1">
            {participate.map((item) => (
              <img
                key={item.id}
                src={getPbImageURL(item, 'photo')}
                alt={item.name}
                className="object-cover rounded-full w-10 h-10"
              />
            ))}
          </div>
        </li>

        <li className="flex flex-col">
          <div className="flex justify-between items-center mr-5">
            <div className="flex flex-col">
              <span className="mt-2 text-lg font-semibold">
                {numberWithComma(price / participateNumber)}원
              </span>
              <span className="text-greenishgray-500 font-semibold">
                1인당 정산비
              </span>
            </div>
            <Participation onUpdateParticipation={handleUpdateParticipation} />
          </div>
        </li>
      </ul>
    </>
  );
}

export default Detail;
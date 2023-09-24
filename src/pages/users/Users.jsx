import {pb} from '@/api/pocketbase';
import crownSmall from '@/assets/icons/crownSmall.svg';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import {getPbImageURL} from '@/utils/getPbImageURL';
import {useQuery} from '@tanstack/react-query';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';

const getUsers = async (id) => {
  return await pb.collection('products').getOne(id, {
    expand: 'creator, participate',
  });
};

function Users() {
  const {id} = useParams();

  const {isLoading, error, data} = useQuery({
    queryKey: ['products', id],
    queryFn: () => getUsers(id),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div role="alert">{error.toString()}</div>;
  }

  const {expand} = data;
  const {creator, participate} = expand;

  return (
    <>
      <Helmet>
        <title>R09M - 참여자 목록</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="합리적인 소비를 위한 공동구매 서비스 R09M 참여자 목록 페이지"
        />
        <meta
          property="twitter:title"
          content="합리적인 소비를 위한 공동구매 서비스 R09M 참여자 목록 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://r09m.vercel.app/products" />
        <meta
          property="og:description"
          content="공동구매 생성자, 참여자를 볼 수 있는 페이지입니다."
        />
        <meta
          name="description"
          content="공동구매 생성자, 참여자를 볼 수 있는 페이지입니다."
        ></meta>
        <meta property="og:image" content="favicon.png" />
        <meta property="og:article:author" content="Ready! Act" />
      </Helmet>
      <div className="px-4 py-2">
        <Header link={`/products/${id}`} />
      </div>

      <h1 className="sr-only">R09M</h1>
      <div className="flex items-center">
      <h2 className="text-lg font-semibold pb-2 mx-auto">참여자 목록</h2>
      </div>

      <ul className="pl-4">
        <li className="flex mb-3 mt-2 items-center font-semibold text-lg">
          <img
            src={getPbImageURL(creator, 'photo')}
            alt={creator.name}
            className="object-cover rounded-full w-14 h-14 relative"
          />
          <img
            src={crownSmall}
            alt="게시물 작성자"
            className="absolute mt-10 ml-10"
          />
          <span className="pl-3 font-extrabold text-lg">{creator.name}</span>
        </li>
      </ul>
      <hr className='my-3 w-[95vw] m-auto' />
      <ul>
        {participate.map((item) => (
          <li key={item.id} className="flex mb-4 items-center">
            <img
              src={getPbImageURL(item, 'photo')}
              alt={item.name}
              className="object-cover rounded-full w-14 h-14 ml-4"
            />
            <span className="pl-3 font-bold text-lg">{item.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Users;

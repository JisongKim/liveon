//import {pb} from '@/api/pocketbase';
import complete from '@/assets/icons/complete.svg';
import proceeding from '@/assets/icons/proceeding.svg';
import waiting from '@/assets/icons/waiting.svg';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import styles from '@/styles/ChangeStatus.module.css';
import {getPbImageURL} from '@/utils/getPbImageURL';
import {numberWithComma} from '@/utils/numberWithComma';
import {useEffect, useRef, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import toast from 'react-hot-toast';
import {useNavigate, useParams} from 'react-router-dom';
import CheckIcon from './CheckIcon';

function ChangeStatus() {
  const {id} = useParams();

  const navigate = useNavigate();

  const selectRef = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const statusValue = selectRef.current.value;

    const formData = new FormData();

    formData.append('status', statusValue);
    try {
      await pb.collection('products').update(id, formData);
      toast.success('진행 상태가 변경되었습니다.', {
        position: 'top-center',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      navigate('/profile');
    } catch (error) {
      throw new Error(error);
    }
  };

  const [data, setData] = useState();

  useEffect(() => {
    async function detailProgress() {
      try {
        //const getStatus = await pb.collection('products').getOne(id);
        setData(getStatus);
      } catch (error) {
        throw new Error(error);
      }
    }

    detailProgress();
  }, [id]);

  if (data) {
    return (
      <>
        <Helmet>
          <title>R09M - 진행 상태</title>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            property="og:title"
            content="합리적인 소비를 위한 공동구매 서비스 R09M 상품 진행 상태 변경 페이지"
          />
          <meta
            property="twitter:title"
            content="합리적인 소비를 위한 공동구매 서비스 R09M 상품 진행 상태 변경 페이지"
          />
          <meta property="og:type" content="web application" />
          <meta property="og:url" content="https://r09m.vercel.app/profile" />
          <meta
            property="og:description"
            content="공동구매 상품의 진행 상태를 변경할 수 있는 페이지입니다. 생성자가 진행 상태에 따라 직접 대기중, 진행중, 공구종료로 변경할 수 있습니다."
          />
          <meta
            name="description"
            content="공동구매 상품의 진행 상태를 변경할 수 있는 페이지입니다. 생성자가 진행 상태에 따라 직접 대기중, 진행중, 공구종료로 변경할 수 있습니다."
          ></meta>
          <meta property="og:image" content="favicon.png" />
          <meta property="og:article:author" content="Ready! Act" />
        </Helmet>
        <h1 className="sr-only">R09M</h1>

        <div className="px-4 py-2 h-screen">
          <div className="px-4">
            <Header link="/profile" />
            <h2 className="pageTitle">진행 상태</h2>
          </div>
          <div>
            <h3 className="font-semibold mt-10">상품 정보</h3>
            <figure className="flex gap-4 h-[100px] mt-5">
              <img
                src={getPbImageURL(data, 'uploadImage')}
                alt={data.title}
                className="w-[30%] h-full"
              />
              <figcaption>
                <h4 className="text-greenishgray-700 font-semibold">
                  {data.title}
                </h4>
                <div className="text-sm flex flex-col">
                  <span className="mt-1 mb-4">
                    {numberWithComma(data.price)}원
                  </span>
                  <span className="max-w-xl text-ellipsis	line-clamp-2">
                    {data.content}
                  </span>
                </div>
              </figcaption>
            </figure>
          </div>
          <h3 className="font-semibold mt-10">현재 상태</h3>
          {data.status === '대기중' ? (
            <div className={`${styles.group} bg-primary-200 flex items-center`}>
              <figure className={styles.figure}>
                <img src={waiting} alt="대기중" aria-hidden="true" />
                <figcaption>
                  <span className={`${styles.title} text-primary-600`}>
                    대기중
                  </span>
                  <p className={styles.description}>참여자를 기다리고 있어요</p>
                </figcaption>
              </figure>
              <CheckIcon color="#258D55" />
            </div>
          ) : data.status === '진행중' ? (
            <div className={`${styles.group} bg-map-200 flex items-center`}>
              <figure className={styles.figure}>
                <img src={proceeding} alt="진행중" aria-hidden="true" />
                <figcaption>
                  <h3 className={`${styles.title} text-map-500`}>진행중</h3>
                  <p className={styles.description}>공구가 시작되었어요.</p>
                </figcaption>
              </figure>
              <CheckIcon color="#F09847" />
            </div>
          ) : (
            <div className={`${styles.group} bg-line-100 flex items-center`}>
              <figure className={styles.figure}>
                <img src={complete} alt="공구종료" aria-hidden="true" />
                <figcaption>
                  <h3 className={`${styles.title} text-greenishgray-500`}>
                    공구종료
                  </h3>
                  <p className={styles.description}>공구가 완료되었어요.</p>
                </figcaption>
              </figure>
              <CheckIcon color="#8D948F" />
            </div>
          )}
          <h3 className="font-semibold mt-10">상태 변경</h3>
          <form onSubmit={handleUpdate}>
            <label htmlFor="status"></label>
            <select
              name="status"
              id="status"
              className="text-center rounded-lg border-solid border-line-400 p-3 border-2 w-[75%] my-5"
              ref={selectRef}
            >
              <option value="대기중">대기중</option>
              <option value="진행중">진행중</option>
              <option value="공구종료">공구종료</option>
            </select>
            <button
              type="submit"
              className="text-white text-center font-semibold bg-primary-500 rounded-lg py-3 w-[20%] ml-3 hover:bg-primary-700"
            >
              변경
            </button>
          </form>
        </div>
      </>
    );
  } else {
    <Spinner />;
  }
}

export default ChangeStatus;

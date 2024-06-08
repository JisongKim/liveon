import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import location from '@/assets/icons/location.svg';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import DetailStatus from './DetailStatus';
import { getAuth } from 'firebase/auth';

const getShareDetails = async (id) => {
  const db = getFirestore();
  const shareRef = doc(db, 'share', id);
  const shareSnap = await getDoc(shareRef);
  const shareData = shareSnap.data();

  if (!shareData) {
    throw new Error('No such document!');
  }

  const userRef = doc(db, 'users', shareData.user_id);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  return {
    id: shareSnap.id,
    ...shareData,
    creatorName: userData.nickname,
    creatorRegion: userData.region,
  };
};

function ShareDetail() {
  const { id } = useParams();
  const [participateCount, setParticipateCount] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(0);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShareDetails = async () => {
      const db = getFirestore();
      const shareRef = doc(db, 'share', id);
      const shareSnap = await getDoc(shareRef);
      const shareData = shareSnap.data();

      if (shareData && shareData.participate) {
        setParticipateCount(shareData.participate.length);
      }

      if (shareData && shareData.participateNumber) {
        setMaxParticipants(shareData.participateNumber);
      }
    };

    fetchShareDetails();
  }, [id]);

  const handleUpdateParticipation = async () => {
    const db = getFirestore();
    const shareRef = doc(db, 'share', id);

    try {
      await updateDoc(shareRef, {
        participate: arrayUnion(auth.currentUser.uid)
      });

      // 채팅방을 생성하거나 이미 존재하는 경우 가져옵니다.
      const chatRef = doc(db, 'chats', id);
      const chatSnap = await getDoc(chatRef);

      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          participants: [auth.currentUser.uid],
          createdAt: new Date(),
        });
      } else {
        await updateDoc(chatRef, {
          participants: arrayUnion(auth.currentUser.uid)
        });
      }

      setParticipateCount((prevCount) => prevCount + 1);
      navigate(`/chat/${id}`);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['shareDetails', id],
    queryFn: () => getShareDetails(id),
  });

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div role="alert">{error.toString()}</div>;
  }

  const {
    category,
    title,
    meetingPoint,
    content,
    creatorName,
    creatorRegion,
  } = data;

  return (
    <>
      <Helmet>
        <title>LIVE:ON - {title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`LIVE:ON - ${title}`} />
        <meta property="twitter:title" content={`LIVE:ON - ${title}`} />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content={`https://r09m.vercel.app/products/${id}`} />
        <meta property="og:description" content={content} />
        <meta name="description" content={content} />
        <meta property="og:image" content="ribbon.png" />
        <meta property="og:article:author" content="LIVE:ON" />
      </Helmet>
      <div className="px-4 py-2">
        <Header />
      </div>
      <h1 className="sr-only">LIVE:ON</h1>
      <div className="flex justify-center mt-2">
        <DetailStatus />
      </div>
      <ul className="pl-4">
        <h2 className="sr-only">상품 정보</h2>
        <li className="flex mb-3 mt-2 items-center font-semibold text-lg justify-between">
          <figure className="flex items-center gap-3 mt-2">
            <figcaption>
              <span style={{ color: 'orange' }}>{creatorRegion}</span> <span>{creatorName}</span>
            </figcaption>
          </figure>
        </li>

        <li className="mt-5">
          <div className="mb-3">
            <span className="font-semibold bg-line-400 text-greenishgray-800 p-2 rounded-xl">
              {category}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold">{title}</h3>
        </li>

        <li className="flex items-center mt-2">
          <div className="pr-2">
            <img src={location} alt="만날 장소" className="w-4 h-4" />
          </div>
          <div>{meetingPoint}</div>
        </li>

        <li className="mt-7">
          <div className="pr-4">{content}</div>
        </li>

        <li className="flex items-center mt-7 pr-4 place-content-between relative">
          <div className="text-base font-bold">
            참여자 {participateCount}/{maxParticipants}
          </div>
        </li>

        <li className="flex flex-col mt-4">
          <button onClick={handleUpdateParticipation} className="bg-primary-500 text-white p-2 rounded">
            참여하기
          </button>
        </li>
      </ul>
    </>
  );
}

export default ShareDetail;

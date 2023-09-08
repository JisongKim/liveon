import { pb } from '@/api/pocketbase';
import participateNum from '@/assets/icons/participateNum.svg';
import pickuptime from '@/assets/icons/pickuptime.svg';
import prev from '@/assets/icons/prev.svg';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const readRecordList = await pb.collection('products').getFullList();

function Total() {
  useEffect(() => {
    try {
      readRecordList;
    } catch (error) {
      throw new Error('error');
    }
  }, []);

  return (
    <>
      <Link to="/">
        <img src={prev} alt="뒤로 가기" className="p-4" />
      </Link>
      <ul>
        {readRecordList.map(
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
            <Link to={id} key={id}>
              <li className="border-4 border-greenishgray-300 rounded-2xl p-5 m-6">
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
                  <h2 className="text-greenishgray-700 font-semibold mt-5 ml-20">
                    {title}
                  </h2>
                  <p className="text-sm my-2">{content}</p>
                </div>
                <div className="flex gap-2 justify-end text-xs text-greenishgray-600">
                  <div className="flex gap-1">
                    <img src={pickuptime} alt="픽업 시간" className="w-4" />
                    <span>{pickup.slice(5, -8).replace('-', '/')}</span>
                  </div>
                  <div className="flex gap-1">
                    <img src={participateNum} alt="참여 인원" className="w-4" />
                    <span>
                      {participate.length}/{participateNumber}
                    </span>
                  </div>
                </div>
              </li>
            </Link>
          )
        )}
      </ul>
    </>
  );
}

export default Total;

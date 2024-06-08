//import {pb} from '@/api/pocketbase';
import myLocation from '@/assets/icons/myLocation.svg';
import pickup from '@/assets/icons/pickup.svg';
import Button from '@/components/Button';
import Header from '@/layout/Header';
import {currentLocation} from '@/parts/map/currentLocation';
import styles from '@/styles/Home.module.css';
import {ClientResponseError} from 'pocketbase';
import {useRef} from 'react';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

const {kakao} = window;
function DetailMap() {
  const {id} = useParams();
  const detailMapRef = useRef(null);
  const [data, setData] = useState();

  useEffect(() => {
    async function detailMapMark() {
      try {
        const readRecordItem = await pb.collection('products').getOne(id);
        setData(readRecordItem);

        if (kakao) {
          const container = detailMapRef.current;
          const options = {
            center: new kakao.maps.LatLng(37.57157200866145, 126.9763416696016),
            level: 5,
          };
          const map = new kakao.maps.Map(container, options);
          const geocoder = new kakao.maps.services.Geocoder();

          const meetingPoint = readRecordItem.meetingPoint;

          geocoder.addressSearch(meetingPoint, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const {y, x} = result[0];
              const coords = new kakao.maps.LatLng(y, x);

              const imageSrc = pickup;
              const imageSize = new kakao.maps.Size(32, 32);
              const pickupImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize
              );

              new kakao.maps.Marker({
                map: map,
                position: coords,
                image: pickupImage,
              });
            }
          });
        } else {
          console.error('kakao에 접근할 수 없습니다.');
        }
      } catch (error) {
        if (!(error instanceof ClientResponseError)) {
          console.error(error);
        }
      }
    }
    detailMapMark();
  }, [id]);

  return (
    <>
      <div className="px-4 py-2">
        <Header link={`/products/${id}`} />
      </div>
      <div ref={detailMapRef} className="w-full h-[600px] my-3 relative">
        <h1 className="sr-only">R09M</h1>
        <Button
          type="button"
          className={`${styles.button} right-2 bottom-4 bg-white p-2`}
          onClick={()=>{currentLocation(detailMapRef.current)}}
        >
          <img src={myLocation} alt="현재 위치로 가기" className="mx-auto" />
        </Button>
      </div>

      <ul>
        <h2 className="sr-only">현재 위치</h2>
        <li className="flex mb-4 mt-4 items-center">
          <span className="mt-5 mb-18 font-extrabold text-lg">
            {data && data.meetingPoint
              ? data.meetingPoint
              : 'Meeting Point가 없습니다.'}
          </span>
        </li>
      </ul>

      <div className=" flex py-2 justify-center">
        <Link to={`/products/${id}`}>
          <Button className="w-[580px] h-16 bg-primary-500 rounded-2xl text-lg text-line-100 font-bold hover:bg-primary-700">
            확인
          </Button>
        </Link>
      </div>
    </>
  );
}

export default DetailMap;

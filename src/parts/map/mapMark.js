import spot from '@/assets/icons/spot.svg';

const { kakao } = window;

let markers = [];
let mapInstance = null;

export async function mapMark(mapElement, readRecordList, setSelectedRecord, selectedRecord, initialLocation) {
  if (kakao) {
    const container = mapElement;
    const options = {
      center: initialLocation || new kakao.maps.LatLng(37.559690, 126.998518),
      level: 5,
    };

    if (!mapInstance) {
      mapInstance = new kakao.maps.Map(container, options);
    } else {
      mapInstance.setCenter(options.center);
    }

    const geocoder = new kakao.maps.services.Geocoder();

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    readRecordList?.forEach(record => {
      const { meetingPoint } = record;
      if (meetingPoint) {
        geocoder.addressSearch(meetingPoint, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const { y, x } = result[0];
            const coords = new kakao.maps.LatLng(y, x);
            const imageSrc = spot;
            const imageSize = new kakao.maps.Size(32, 32);
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            const marker = new kakao.maps.Marker({
              map: mapInstance,
              position: coords,
              image: markerImage,
            });

            markers.push(marker);

            // 마커 클릭 시 지도의 중심을 현재 위치로 유지
            kakao.maps.event.addListener(marker, 'click', () => {
              const currentCenter = mapInstance.getCenter(); // 현재 중심 저장
              if (selectedRecord && selectedRecord.id === record.id) {
                setSelectedRecord(null);
              } else {
                setSelectedRecord(record);
              }
              setTimeout(() => mapInstance.setCenter(currentCenter), 0); // 중심을 저장된 위치로 설정
            });
          }
        });
      }
    });
  } else {
    console.error('kakao에 접근할 수 없습니다.');
  }
}

import spot from '@/assets/icons/spot.svg';

const { kakao } = window;

let markers = [];

export function mapMark(mapInstance, readRecordList, setSelectedRecord, selectedRecord) {
  if (kakao && mapInstance) {
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

            // 마커 클릭 시 지도 중심 변경하지 않음
            kakao.maps.event.addListener(marker, 'click', () => {
              if (selectedRecord && selectedRecord.id === record.id) {
                setSelectedRecord(null);
              } else {
                setSelectedRecord(record);
              }
            });
          }
        });
      }
    });
  } else {
    console.error('kakao 또는 mapInstance에 접근할 수 없습니다.');
  }
}

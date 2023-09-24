import currentSpot from '@/assets/icons/currentSpot.svg';

const {kakao} = window;

export function currentLocation(mapElement) {
  if (kakao) {
    const container = mapElement;
    const options = {
      center: new kakao.maps.LatLng(37.57157200866145, 126.9763416696016),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      '서울특별시 종로구 관훈동 30-9',
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const {y, x} = result[0];
          let coords = new kakao.maps.LatLng(y, x);

          const imageSrc = currentSpot;
          const imageSize = new kakao.maps.Size(40, 40);
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

          new kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage,
          });
          map.setCenter(coords);
        }
      }
    );
  } else {
    console.error('kakao에 접근할 수 없습니다.');
  }
}

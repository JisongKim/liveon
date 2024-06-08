import currentSpot from '@/assets/icons/currentSpot.svg';

const { kakao } = window;
let currentLocationMarker = null;

export function currentLocation(mapInstance, updateMapCenter, setUserLocation) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const coords = new kakao.maps.LatLng(lat, lon);

        console.log("Current position:", lat, lon); // 디버깅 로그 추가

        const imageSrc = currentSpot;
        const imageSize = new kakao.maps.Size(40, 40);
        const imageOption = { offset: new kakao.maps.Point(20, 40) }; // 이미지 옵션 추가

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // 기존 마커 제거
        if (currentLocationMarker) {
          currentLocationMarker.setMap(null);
        }

        // 새 마커 생성
        currentLocationMarker = new kakao.maps.Marker({
          map: mapInstance,
          position: coords,
          image: markerImage,
        });

        // 지도 중심을 설정
        updateMapCenter(coords);
        setUserLocation(coords); // 사용자 위치 설정
      },
      (error) => {
        console.error('Error occurred. Error code: ' + error.code, error.message); // 에러 로그 추가
        // 에러 처리
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    // 브라우저가 위치 서비스를 지원하지 않는 경우 처리
  }
}

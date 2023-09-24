# 합리적인 소비를 위한 공동구매 서비스 "🍅공구룸(R09M)🥕”

**🦁 멋쟁이사자처럼 6기 ReadyAct 팀의 React 팀프로젝트**

🗓️ 기획 기간 : 2023.08.29 ~ 2023.09.05 </br>
🗓️ 개발 기간 : 2023.09.05 ~ 2023.09.25 </br>
🗓️ 추후 리팩토링 예정 기간 : 2023.09.26 ~ </br>

## 👀배포주소

## https://r09m.vercel.app/

## 팀소개

Ready! Act

## 팀원 소개

### Ready-Act! : TEAM 소개

|                                                  [이은빈](https://github.com/ingbinsee)                                                   |                                                  [조지현](https://github.com/jellyjoji)                                                   |                                                 [홍다영](https://github.com/hongdayeong)                                                  |                                                  [서진만](https://github.com/seojinman)                                                   |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="200" height="150" src="https://github.com/FRONTENDSCHOOL6/ready-act/assets/117728530/48f871e8-38b3-4de1-a8d6-88bab6ce3f24" /> | <img width="200" height="150" src="https://github.com/FRONTENDSCHOOL6/ready-act/assets/117728530/e388e000-4707-4b8d-a820-1cfb65f69251" /> | <img width="200" height="150" src="https://github.com/FRONTENDSCHOOL6/ready-act/assets/117728530/73547a0e-7318-4482-babc-74958faba793" /> | <img width="200" height="150" src="https://github.com/FRONTENDSCHOOL6/ready-act/assets/117728530/28034a5a-8f7b-4160-9f20-81baf0fb5b58" /> |

<div style="text-align: right">
<small> COPYRIGHT RESERVED. 2023 &copy; By Armin Khorsandipour</small>
</div>
<br />

## 기능별 페이지 분석

<h1>공통 요소</h1>
아이콘의 경우 내장된 이모티콘을 활용하여 저작권 문제를 해결하고 익숙함을 이끌어 냄</br>
Button, Input 같이 재사용성이 높은 요소는 아토믹 컴포넌트로 제작</br>

## 이은빈

### 🍎 메인 페이지

- Splash: Framer-motion을 활용하여 로고 애니메이션 적용, LocalStorage를 활용하여 최초 1회만 보는 기능 구현</br>
- 상단 메뉴(전체 / 채소 / 과일 / 곡류 / 육류): Swiper.js를 활용하여 FreeMode 효과 적용, 접근성을 고려하여 Keyboard, Mousewheel로 조작 가능하도록 구현, 클릭 시 필터링된 상품 리스트 페이지로 이동</br>
- 지도: 카카오 지도 API를 활용하여 PocketHost에 등록된 공동구매 상품의 픽업 위치 표시</br>
- 더하기 버튼: 방 개설 페이지로 이동</br>
- 하단 메뉴(홈 / 검색 / 내 정보): 메뉴 클릭 시 각각 메인 페이지, 검색 페이지, 프로필 페이지(로그인하지 않은 경우 로그인 페이지)로 이동</br>

### 🧾상품 리스트 페이지

- 뒤로가기 버튼: 버튼 클릭 시 메인 페이지로 이동</br>
- 리스트: PocketHost를 활용하여 카테고리, 상품명, 상세내용, 진행상태, 픽업 일자, 참여자 현황 정보 렌더링</br>

### 🔎 검색 페이지

- 검색: PocketHost를 활용하여 키워드 입력 시 해당 키워드가 포함된 상품 필터링</br>

### 🧑 회원가입 페이지

- 회원가입: 프로필, 이름, 이메일, 비밀번호 입력 후 가입 버튼 클릭 시 PocketHost에 유저 정보 등록 후 로그인 페이지로 이동</br>

### 👩 프로필 페이지

- 프로필: 로그인 시 LocalStorage에 유저 정보 저장 후 로그인된 사용자 정보(이름, 이메일, 가입일자) 렌더링</br>
- 판매 상품: PocketHost를 활용하여 사용자가 판매하는 상품 렌더링</br>
- 로그아웃: 로그아웃 클릭 시 LocalStorage에서 저장된 정보를 삭제</br>
- 회원탈퇴: 회원탈퇴 버튼 클릭 시 PocketHost에서 사용자 정보 제거</br>

### 🔄 진행상태 변경 페이지

- 상품 정보: PocketHost를 활용하여 제품명, 가격, 상세내용 렌더링</br>
- 현재 상태: PocketHost를 활용하여 상품의 현재 진행 상태 렌더링</br>
- 상태 변경: 상태값 설정 후 변경 버튼 클릭 시 PocketHost에 등록된 정보 업데이트</br>

## 조지현

### 🏡 방 개설 페이지

- Context API 를 사용한 전역 상태 관리와 컴포넌트 간의 데이터 전달 편리화
- 페이지 이동시 전역 데이터 공유를 통한 상태값 유지 기능으로 UX 사용성 개선
- Pocket Host 를 이용한 서버 통신과 Form 데이터 생성
- Kakao Map API 를 사용한 공동구매 거래 위치 선택 기능
- Local Storage 와 Pocket Host 의 ID 를 비교하여 동명이인을 방지한 로그인 정보 출력
- HTML `<Form>` 태그를 사용한 데이터 전송과 수신
- 다양한 입력 양식 제작 `<input>` `<button>` `<textarea>` `<date>` `<select>` `<option>`
- react-router-dom 의 Link 컴포넌트를 사용한 렌더링
- 이미지를 업로드할 수 있는 파일 업로드 기능
- Date.prototype.toISOString() 메서드를 활용한 날짜와 시간 데이터 커스텀
- 참여 인원을 계산해주는 Counter 기능
- 아토믹 컴포넌트를 활용한 코드 분산 관리

## 서진만

### 📱 게시물 상세 페이지

- 게시물 : 기존 방 개설 페이지에 기재한 사항이 반영될 수 있도록 함</br>
  PocketHost를 활용하여(게시물 작성자, 상품명, 상품이미지, 픽업 시간, 장소, 내용, 참여인원, 참여자의 프로필사진, 1인당 정산비)렌더링</br>
- PocketHost의 관계확장을 이용하여 참여 인원의 프로필 이미지 화면에 렌더링

### 🧸 모달 다이얼로그

- 더보기 버튼 : 클릭 시 참여자 관리, 모임 삭제 리스트 확인
- 더보기, 참여하기 버튼 : 클릭 시 Framer-motion을 활용하여 애니메이션 적용
- TAP : 접근성을 고려하여 Keyboard로 접근할 때 focus가 모달 다이얼로그 밖으로 나가지 못하게 설정
- 딤(Dim) : 딤처리를 하여 모달 다이얼로그 이외의 작업을 하지 못하도록 설정

### ⏰ 픽업 위치페이지

- 지도API : 게시물 상세 페이지의 픽업위치> 를 누르면 카카오 지도 API를 활용하여 PocketHost에 등록된 공동구매 상품의 픽업 위치를 표시</br>

### 🙋 참여 유저 목록 페이지

- 참여 유저 목록 :게시물 상세 페이지의 참여하기 버튼 클릭 후 네,참여할래요를 누르면 LocalStorage에있는 현재 로그인된 사용자의 아이디 값과 네,참여할래요의 버튼을 누른 사용자(PocketHost에 등록 되어있는 사용자)의 아이디 값이 같다면 참여유저 목록페이지, 게시물 상세 페이지의 참여인원 및 프로필 사진을 화면에 렌더링
- PocketHost : 임시로 먼저 쌓인 데이터(유저정보)를 화면에 렌더링

## 홍다영

### 👯 로그인 페이지

- 로그인 : 아이디,비밀번호 입력시 pocketHost에 등록된 정보와 일치 여부 확인,로컬스토리지에 저장 후 로그인

### 📲 모달 다이얼로그

- 참여하기 버튼 클릭시 한 번 더 확인하기 위해 창을 띄운 후 사용자가 선택한 것에 따라 창 넘어가기

### 🏧 pocketBase 데이터쌓기

- pocketHost에 팀원들이 필요한 사용자 정보 및 프로필,프로덕스 정보(판매 상품,픽업 위치,픽업 날짜,상태,사진 등) 여러가지 데이터를 쌓아서 데이터 당길 수 있도록 하였습니다!!

## 🧑‍🤝‍🧑 서비스 구현 목적

### 공동 구매 모임 모바일 서비스 플랫폼 구축

- 사용자가 안전하게 공동 구매의 모임을 개설하고 참여하여 소비 비용절감 등의 긍정적인 효과를 경험할 수 있는 모바일 공동 구매 모임 플랫폼 서비스

## 💁 서비스 소개 및 사용방법

### PPT

- https://www.canva.com/design/DAFvIYWAAfs/08mFk2Ei-nhKsZSOM7vjEw/edit

### YouTube - R09M 시연영상

[![R09M](https://img.youtube.com/vi/zv3tWgo-yR8/0.jpg)](https://youtu.be/zv3tWgo-yR8)

## 👩‍🏫 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
 <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
 <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
 <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">  
</br>

### 🧰 Tools </br>

<img src="https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

### 📕 Library

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=blue">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=pink">
<img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=react router&logoColor=black">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/pocketbase-B8DBE4?style=for-the-badge&logo=pocketbase&logoColor=black">
<img src="https://img.shields.io/badge/framer-0055FF?style=for-the-badge&logo=framer&logoColor=black">
<img src="https://img.shields.io/badge/swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white">
<img src="https://img.shields.io/badge/kakao Map-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">

## 🎯 주요 기능

- 상품 데이터 베이스 (PocketHost)
- 상품 검색 엔진
- 사용자 인증(회원가입, 로그인, 로그아웃, 회원탈퇴)
- 지도API를 활용한 위치 기반 서비스

## 📋 라이선스

- MIT License</br>
  https://github.com/FRONTENDSCHOOL6/ready-act/blob/main/LICENSE

## 📁 디렉토리 트리

```
📦src
 ┣ 📂api
 ┃ ┗ 📜pocketbase.js
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜activeAlarm.svg
 ┃ ┃ ┣ 📜arrow.svg
 ┃ ┃ ┣ 📜arrowLeft.svg
 ┃ ┃ ┣ 📜close.svg
 ┃ ┃ ┣ 📜complete.svg
 ┃ ┃ ┣ 📜crownSmall.svg
 ┃ ┃ ┣ 📜currentSpot.svg
 ┃ ┃ ┣ 📜dinner.svg
 ┃ ┃ ┣ 📜dots.svg
 ┃ ┃ ┣ 📜imgUpload.svg
 ┃ ┃ ┣ 📜inactiveAlarm.svg
 ┃ ┃ ┣ 📜location.svg
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┣ 📜minusCircle.svg
 ┃ ┃ ┣ 📜myLocation.svg
 ┃ ┃ ┣ 📜participateNum.svg
 ┃ ┃ ┣ 📜pickup.svg
 ┃ ┃ ┣ 📜pickuptime.svg
 ┃ ┃ ┣ 📜plus.svg
 ┃ ┃ ┣ 📜plusCircle.svg
 ┃ ┃ ┣ 📜prev.svg
 ┃ ┃ ┣ 📜proceeding.svg
 ┃ ┃ ┣ 📜reset.svg
 ┃ ┃ ┣ 📜spot.svg
 ┃ ┃ ┗ 📜waiting.svg
 ┃ ┗ 📜placeholderProfile.jpeg
 ┣ 📂components
 ┃ ┣ 📜Button.jsx
 ┃ ┣ 📜FormInput.jsx
 ┃ ┣ 📜Input.jsx
 ┃ ┗ 📜Spinner.jsx
 ┣ 📂context
 ┃ ┗ 📜Auth.jsx
 ┣ 📂data
 ┃ ┗ 📜category.js
 ┣ 📂hooks
 ┃ ┗ 📜useStorage.js
 ┣ 📂layout
 ┃ ┣ 📜CreateHeader.jsx
 ┃ ┗ 📜Header.jsx
 ┣ 📂pages
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜Profile.jsx
 ┃ ┃ ┣ 📜SignIn.jsx
 ┃ ┃ ┣ 📜SignUp.jsx
 ┃ ┃ ┗ 📜Withdrawal.jsx
 ┃ ┣ 📂details
 ┃ ┃ ┣ 📜Backdrop.jsx
 ┃ ┃ ┣ 📜Cancel.jsx
 ┃ ┃ ┣ 📜ChangeStatus.jsx
 ┃ ┃ ┣ 📜CheckIcon.jsx
 ┃ ┃ ┣ 📜Detail.jsx
 ┃ ┃ ┣ 📜DetailMap.jsx
 ┃ ┃ ┣ 📜DetailStatus.jsx
 ┃ ┃ ┣ 📜Dialog.jsx
 ┃ ┃ ┣ 📜Participation.jsx
 ┃ ┃ ┣ 📜SeeMore.jsx
 ┃ ┃ ┗ 📜StatusIcon.jsx
 ┃ ┣ 📂products
 ┃ ┃ ┣ 📜Fruit.jsx
 ┃ ┃ ┣ 📜Grains.jsx
 ┃ ┃ ┣ 📜Meat.jsx
 ┃ ┃ ┣ 📜Total.jsx
 ┃ ┃ ┗ 📜Vegetable.jsx
 ┃ ┣ 📂users
 ┃ ┃ ┣ 📜SignInUsers.jsx
 ┃ ┃ ┗ 📜Users.jsx
 ┃ ┣ 📜CreateRoom.jsx
 ┃ ┣ 📜Home.jsx
 ┃ ┣ 📜Logo.jsx
 ┃ ┗ 📜Search.jsx
 ┣ 📂parts
 ┃ ┣ 📂create
 ┃ ┃ ┣ 📜CategoryDropdown.jsx
 ┃ ┃ ┣ 📜ContentTextarea.jsx
 ┃ ┃ ┣ 📜Creator.jsx
 ┃ ┃ ┣ 📜DatePicker.jsx
 ┃ ┃ ┣ 📜FileUpload.jsx
 ┃ ┃ ┣ 📜MeetingPoint.jsx
 ┃ ┃ ┣ 📜ParticipateCounter.jsx
 ┃ ┃ ┣ 📜PaymentToggleButton.jsx
 ┃ ┃ ┣ 📜Price.jsx
 ┃ ┃ ┣ 📜Status.jsx
 ┃ ┃ ┣ 📜TimePicker.jsx
 ┃ ┃ ┗ 📜Title.jsx
 ┃ ┣ 📂map
 ┃ ┃ ┣ 📜currentLocation.js
 ┃ ┃ ┣ 📜Location.jsx
 ┃ ┃ ┣ 📜Location.module.css
 ┃ ┃ ┗ 📜mapMark.js
 ┃ ┣ 📂nav
 ┃ ┃ ┣ 📜HomeIcon.jsx
 ┃ ┃ ┣ 📜Nav.jsx
 ┃ ┃ ┣ 📜ProfileIcon.jsx
 ┃ ┃ ┗ 📜SearchIcon.jsx
 ┃ ┗ 📜AnimationLogo.jsx
 ┣ 📂styles
 ┃ ┣ 📜ChangeStatus.module.css
 ┃ ┣ 📜customComponents.css
 ┃ ┣ 📜Home.module.css
 ┃ ┣ 📜Nav.module.css
 ┃ ┗ 📜tailwind.css
 ┣ 📂utils
 ┃ ┣ 📜debounce.js
 ┃ ┣ 📜getPbImageURL.js
 ┃ ┗ 📜numberWithComma.js
 ┣ 📜App.jsx
 ┣ 📜main.jsx
 ┗ 📜routes.jsx
```

## 🍭 참고 자료</br>

- 기획 PPT : https://www.canva.com/design/DAFtduXfXbA/jRnic1N9EeQvgeXpOlpl5Q/view
- wiki : https://github.com/FRONTENDSCHOOL6/ready-act/wiki

## 🙉🙈🙉 프로젝트 회고

| 이름                   | 회고내용                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| 이은빈 조장 🚀         | 기획부터 배포까지 직접 진행하며 원하는 서비스와 기능에 집중하여 '프로젝트 16조'만의 개성이 담긴 서비스를 만들었다는 점에서 감회가 새롭습니다. 직접 기획한 서비스인만큼 구현하고 싶은 기능에 집중하여 개발할 수 있었다는 점, 프로젝트를 유동적으로 설계 / 변경할 수 있다는 점에서 프로젝트에 대한 집중도, 만족도가 높았습니다. 또한, 개념을 알고 있는 것에서 그치지 않고 학습한 내용을 다양하게 활용하며 직접 서비스를 만들어 보니 '왜 TanStack Query가 필요한지, 상태 관리가 중요한지', 어떻게 사용해야 하는지에 대해 체감할 수 있어 진정한 '습(習)'의 시간을 가질 수 있었습니다. 아직 구현하고 싶은 기능이 많고, 사용자를 고려한 서비스가 되기에 개선해야 할 부분이 많습니다. 따라서 프로젝트가 끝남에 안주하지 않고 계속해서 리팩토링의 과정을 거쳐 실제 사용자가 사용할 수 있는 서비스로 만들고 싶습니다.                                                                                                                                                                                                                                           |
| 조지현 스크럼마스터 🚩 | 리엑트 기능 작동 원리에 깊이 이해할 수 있는시간이었습니다. 다양한 기능을 고민하고 구현하는 과정을 통해 리엑트 상태관리에 대한 이해도를 높일 수 있었으며 PocketHost 통신과 지도 API 등 기능 구현에 대한 흥미를 한 층 더 높일 수 있는 계기가 되었습니다. PocketHost 와 통신하며 Create Form 양식을 전송하는 와중에 많은 문제를 겪었고 이를 통해 문제 상황을 해결하는 능력을 기를 수 있었으며 useRef 에 의지하여 제작하던 코드 구조를 Context API 를 사용하여 리팩토링 하는 작업을 하면서 Context API 를 통한 상태 관리에 대한 이해도를 쌓을 수 있는 기회를 가지게 되었습니다. 프로젝트를 진행하는 동안 팀원들과 코드가 제대로 동작하는지를 테스트하고 선생님과 팀원들의 도움을 받아 가며 서로 지식을 공유하며 협업하는 경험을 하면서 전체적으로 프로젝트를 통해 팀워크와 커뮤니케이션 능력을 향상시킬 수 있는 소중한 시간이었습니다.                                                                                                                                                                                                                     |     |
| 서진만                 | 3주가 조금 넘는 기간동안 React프로젝트를 하면서 팀원들과 함께 원하는 주제로 기획부터 배포까지 양보하고 합의점을 찾아 끊임없이 피드백을 주고 받으면서 팀원들의 열정이 느껴져 지치는 줄 모르고 자극을 받아 끝까지 열심히 할 수 있었습니다. 이번 프로젝트를 통해 [PocketHost] 에 있는 데이터 들을 SDK방식으로 데이터를 불러와 화면에 렌더링 하는 방법과 관계확장을 통해 카테고리가 다른 데이터도 한페이지에 가져올 수 있다는 것을 알게 되었습니다. 그리고 이번 프로젝트를 통해 [카카오 지도 API] 를 활용하여 픽업할 위치를 설정하게 되어 매우 만족하고 있습니다. 또 모달 다이얼로그를 [Framer Motion] 을 이용하여 애니메이션 효과를 주어 사용자에게 재미를 줄 수 있을것 같아 만족하고 있는 부분입니다. 이번 프로젝트에서 가장 어려웠던 점은 TanStack Query 입니다. 처음에는 TanStack Query를 왜 사용하는지에 대해서 의문점이 많았지만 [TanStack Query] 를 사용하고 나서는 코드가 간결해지고 한번 불러온 데이터 들을 캐싱하여 다른 페이지를 갔다가 다시 원래의 페이지로 돌아올때 빠른 속도로 화면에 렌더링 된다는 점이 가장 장점인 것을 느끼게 되었습니다. |
| 홍다영                 | 프로젝트를 하며 팀원들과 소통하고 어렵지만 같이 해나갈 수 있는 협업에 대해 많이 배운 것 같습니다!!그리고 일부분이 아니라 자유 주제로 기획,디자인 등등을 매일매일 회의하며 다같이 만들어 갈 수 있어서 좋은 경험이었습니다. 포켓베이스를 활용한 구현이 익숙하지 않고 어려워서 제대로 페이지 기능 구현을 못 한 것 같아 너무 아쉽지만 사용해 볼 수 있는 기회라서 좋았습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## 👨‍💻👩‍💻 Support 연락 경로(E-mail , Github)

- 이은빈 :ingbinsee@gmail.com</br>
  https://github.com/ingbinsee

- 조지현 : juicy_joji@yu.ac.kr</br>
  https://github.com/jellyjoji</br>

- 홍다영 :dudgirl135@naver.com</br>
  https://github.com/hongdayeong</br>

- 서진만 : dirnrhd21@naver.com</br>
  https://github.com/seojinman

## 설치 방법

### 패키지 설치

```
npm i 또는 pnpm i
```

### 개발 서버 실행

```
npm run dev 또는 pnpm dev
```

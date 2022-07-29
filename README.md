# ☕️ caffeineMarket
## **1. 프로젝트 소개**
> 🧷 <a href="https://secondlinefirefist.github.io/caffeineMarket">배포 URL</a>

커피를 좋아하는 현대인이라면 손쉽게 로그인하여 커피와 관련된 상품을 판매하고 일상을 공유할 수 있는 SNS 서비스입니다.  커피와의 일상을 게시글로 공유하며 좋아요와 댓글을 통해 사용자와 소통합니다. 다양한 사람들을 팔로우하고, 마음에 드는 피드가 있다면 '좋아요'를 누르거나 댓글을 달 수도 있습니다. 또한, 다른 사용자와 채팅창을 이용해 즐거운 대화도 나눌 수 있습니다.

<br>

## 2. 팀원 소개(2호선 불주먹팀)
|김민영|김지수|김태희|채지훈|
|:-----------:|:-----------:|:-----------:|:-----------:|
| <img width="180px" src="https://user-images.githubusercontent.com/101693495/180898054-cf7cbf5c-0476-402b-b7bd-a088ffd6d126.jpg">| <img width="180px" src="https://user-images.githubusercontent.com/101693495/180899475-794fd51c-cef7-4154-b452-aeda89dd6f09.png"> | <img width="180px" src="https://user-images.githubusercontent.com/101693495/180899712-35607b00-3b6f-408d-8f7f-568a60072be9.jpg"> |<img width="180px" src="https://user-images.githubusercontent.com/101693495/180897571-3f123fcb-517b-4c82-83be-af644a98c973.jpg">|
|🔗 <a href="https://github.com/BradleyyKim">BradleyyKim</a>|🔗 <a href= "https://github.com/jsk3342">jsk3342</a>|🔗 <a href="https://github.com/greenT-Hee">greenT-Hee</a>|<a href ="https://github.com/jihoon-chae">🔗 jihoon-chae</a>|

<br>

## 3. 목표
바닐라 자바스크립트를 통해 라우팅활용 및 상태관리, 비동기 통신 개념 등 기초적인 활용을 학습하고 구체적인 이해를 목표로 제작
- 빠른 기능 구현을 목표
- 유저와의 상호작용이 큰 프로젝트에서 동적인 UI의 필요성 체감하기 위함
- 웹 서비스의 규모의 커짐에 따라 리액트 컴포넌트의 중요성을 직접 확인하기 위함
- DOM 이벤트의 복잡성을 직접 체감하면서 virtual DOM의 필요성을 체감하기 위함

<br>

## 4. 개발 환경 

### 4.1 스택
* Front-End : HTML CSS JavaScript Sass
* Back-End : 제공된 API 사용
### 4.2 개발 관리
* 버전 관리 및 이슈 : Github, Jira, Slack
* 회의록: 🔗 <a href="https://github.com/secondlinefirefist/caffeineMarket/wiki/2%ED%98%B8%EC%84%A0-%EB%B6%88%EC%A3%BC%EB%A8%B9-%ED%9A%8C%EC%9D%98%EB%A1%9D-%F0%9F%94%A5">Github Wiki</a>, Notion
* 디자인 : Figma, Illustrator

|Jira|Slack|
|:-----------:|:-----------:|
|<img src= "https://user-images.githubusercontent.com/101693495/181179852-4a42b02f-c587-46dd-8538-680c771163b2.png" width= "500px">|<img src="https://user-images.githubusercontent.com/101693495/181180614-afc1cba9-e4d2-478c-9747-3026c5277c26.png" width="360px">|

<br>

## 5. 프로젝트 구조와 개발 일정
### 5.1 프로젝트 구조
```
.
├──📁 src
   ├──📁 pages
   |   └── ...html
   ├──📁 css
   ├──📁 img
   └──📁 js
```

## 6. 역할 분담

### 👨🏻‍🚒 김지수
- splash 구현
- 로그인 기능 구현
- 회원가입 구현
- 프로필 수정 구현

### 👨🏻‍🚒 김민영
- 게시글 등록(upload)
  - 텍스트 입력 및 업로드 구현
  - 여러 이미지 업로드 구현
  - POST요청으로 API에 데이터 저장
- 게시글 상세 페이지(postDetail)
  - myProfile 페이지에서 이미지 클릭 시 postId값을 불러와 상세 페이지 UI 구현
  - API에 저장된 개인 로그인 토큰을 이용해 GET요청을 통해 UI 구성
  - 댓글 UI 구현
- 댓글 작성 기능(commentLoad)
  - 댓글 작성 시 reload를 통해 댓글 실시간 추가 구현
- 검색페이지(search)
  - 검색 결과 박스 실시간 구현 예정

### 👨🏻‍🚒 채지훈
- 상품등록 (product)
   - 이미지 업로드 기능 구현
   - 상품 데이터 POST 요청

- 상품수정(productModification)
   - 이미지 업로드 기능 구현
   - 상품 데이터 GET요청/ PUT 요청

- 채팅방(chatRoom) 
   - 텍스트 입력후 전송 버튼 클릭시 채팅창에 렌더링
   - 이미지 업로드시 채팅창에 렌더링

### 👷🏻‍♀️ 김태희
- myProfile & yourProfile 
   - 유저 정보, 상품&게시글 리스트 GET
 - 공용 및 프로필 모달, 삭제, 로그아웃 기능 구현

- follwing & follower
   - 팔로잉/ 팔로우 API GET, DELETE, POST
   - 팔로우 버튼 누르면 숫자 증감 반영  

- 좋아요 기능 
   - 좋아요 API POST, DELETE 요청

- 일러스트 로고 디자인
   - 카페인 마켓 캐릭터 로고 및 아이콘 제작

## 7. 개발 기간
2022.06.09 ~ 2022.07.29 

<br>

## 8. UI 
![image](https://user-images.githubusercontent.com/85912592/181695898-0b214533-85e1-4793-a6d0-0da63d1ecd22.png)


## 9. 페이지 기능
> <a href="https://github.com/secondlinefirefist/caffeineMarket/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85"> 페이지 기능 상세 설명</a>
### 1) 홈

|splash|로그인 페이지|회원가입 페이지|
|---|---|---|
|![splash](https://user-images.githubusercontent.com/85912592/181692800-8fa20db5-ca1f-461a-bbea-eaf56556d858.gif)|![login](https://user-images.githubusercontent.com/85912592/181692853-7143bf70-4073-4196-92f0-a485f5dc5ff5.gif)|![회원가입](https://user-images.githubusercontent.com/85912592/181692894-3fc71447-3c53-474b-98d2-6d870b5dd5a3.gif)|

|홈 페이지|채팅 페이지|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/85912592/181693043-450a811e-bca1-43a8-ae85-240bd8430a94.gif" width="310px">|<img src = "https://user-images.githubusercontent.com/85912592/181693095-a819296f-13a7-4038-8f80-ec3ef3f4b0a9.gif" width="310px">|
		
### 2) 게시글

|게시글 작성 페이지|게시물 상세 페이지|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/85912592/181693332-07033992-a961-42a2-98d7-b7e4c7e5ca1f.gif" width="310px">|<img src="https://user-images.githubusercontent.com/85912592/181693351-2ad9af49-d6e3-4b87-b645-e10565963bee.gif"  width="310px">|

|게시글 수정|댓글 기능 |
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/85912592/181693379-ed4d7f92-bb2e-43ce-b108-7cf9a894d987.gif"  width="310px">|<img src="https://user-images.githubusercontent.com/85912592/181693416-299cf569-dbbe-4bcb-9f6c-c621411745d6.gif"  width="310px">|
	
### 3) 프로필

|마이 프로필 페이지|유어 프로필 페이지|팔로우/팔로잉 기능|
|---|---|---|
|![마이프로필](https://user-images.githubusercontent.com/85912592/181693644-9203e11b-2864-4893-b818-b53381305044.gif)|![유저프로필](https://user-images.githubusercontent.com/85912592/181693679-c5255b89-c021-43da-94b9-bcd0073dddae.gif)|![팔로워페이지](https://user-images.githubusercontent.com/85912592/181693711-7ccb1428-01ae-43bd-8a1e-aae8c018ce3b.gif)|

|로그아웃 페이지|프로필 수정 페이지|
|---|---|
|<img src="https://user-images.githubusercontent.com/85912592/181693790-af05192c-b506-4738-9ed4-5d0db68bdc5e.gif" width="314px">|<img src="https://user-images.githubusercontent.com/85912592/181693818-625a358a-d093-4ab1-834b-e7aa4e213110.gif"  width="315px">|
		
### 4) 판매 상품

|상품 등록 페이지 & 상품 링크 이동|상품 수정 페이지|상품 삭제 페이지|
|---|---|---|
|![상품등록](https://user-images.githubusercontent.com/85912592/181693893-5410da25-aef5-4065-b59a-214485d7ab71.gif)|![상품 수정](https://user-images.githubusercontent.com/85912592/181693919-fd9fea09-80c9-4c6d-92b7-2712ac7fbea0.gif)|![상품 삭제](https://user-images.githubusercontent.com/85912592/181694065-6548337a-be72-4b3e-9190-4686d0807762.gif)|
	
## 10. 트러블 슈팅(핵심 로직)
### 요소 생성(createElement vs innerHTML)

- 문제 상황
    - JavaScript에서 요소를 생성할 때(특히 반복되는 리스트들), map과 innerHTML을 사용함
    - innerHTML은 간혹 인식되 않아 null 값을 반환하는 경우가 생겨 Error가 발생
    - 사용은 편리하지만 성능이 가장 나쁨
    - 보안 상의 문제도 존재(스크립트 해킹을 당할 수 있음)

- 해결 방법
    - 코드가 길어지더라도 안전하고 성능이 좋은 createElement로 모든 요소를 생성하고 반복되는 요소를 생성할 때는 for문을 사용
    - 팀원 모두 createElement를 공통적으로 사용

**기존 코드)**

```jsx
function createProductList() {
  productList.innerHTML = prodcutListDummy
    .map(
      (element) =>
        `
  <li>
    <button type="button" class="btnProductItem" id="btnProductItem">
      <img src=${element.itemImage} alt="상품1" />
      <span class="prodcutTitle">${element.itemName}</span>
      <strong class="prodcutPrice">${element.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
    </button>
  </li>
  `
    )
    .join('');
}
```

**해결 코드)**

```jsx
function createProductList() {
  for (let i = 0; i < prodcutListDummy.length; i++) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const strong = document.createElement('strong');
		
	**생략 ...**
}
```

## 11. 스페셜 포인트
- 팀원들과 가까운 거리에 거주하여, 물리적 허들이 없다는 장점을 통해 최소 주 2회 오프라인 만남을 통해 빠른 피드백과 소통으로 소통 비용 절감
- 팀원 간 이슈가 발생했을 때, 대면을 통한 솔직한 대화를 통해 바로 해결하여 시간 절약
- 로그인 기능과 배포 페이지를 우선적으로 구현함으로써 시스템적으로 연결된 기능들을 빠르게 구현
- 압도적인 커밋 수 (over 740 commits)

## 12. 고생담 
- API와 비동기로 통신하는 로직에 대한 이해가 어려움
- 팀원 절반이 중간에 코로나에 걸린 건강 이슈
- 커밋 컨벤션이 혼재되어 사용된 이슈

## 13. 레슨런 

### Team Operation
- <a href="https://velog.io/@minyoungdumb/%EC%A3%BC%EB%8B%88%EC%96%B4%EC%9D%98-JIRA%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%98%91%EC%97%85%ED%95%98%EA%B8%B0">JIRA를 도입하여 1주일 단위로 스프린트에 할 일을 작성하여 원할한 일정 관리</a>
- Slack과 Github 브랜치를 연결하여 팀원의 커밋을 확인하고, 어떤 기능을 작업하는 지 즉각 확인
- github 페이지를 초기에 빠르게 배포하여 트러블 슈팅과 에러처리를 해결 및 유저 피드백을 통해 지속적으로 Q/A 진행

### Tech Operation
- 잘 이행된 부분
    - 간단한 CI/CD action 기능으로 자동 배포 수행 및 개념 이해
    - API 명세에 대해 구체적으로 미리 파악해 서버와 통신을 원활하게 유지
    - 비동기 작업에 대한 이해를 통해 유연하게 이벤트를 동작
    - 폴더 구조를 미리 지정해 파일 경로 문제 제거
    - 시작 전 git-flow에 대한 이해를 통해 branch 구체적으로 세분화하여 에러 방지
    - 팀원 간 페이지 별로 작업 진행하여 충돌 최소화
    - 재사용성을 고려하여 javaScript 기능을 구현해 모듈화 리팩토링 단계를 위한 기반을 마련
- 개선 및 학습한 부분
    - 기능 복잡도가 올라갈 수록 javaScript 기능별로 구현하는 것이 더 낫다는 결론에 도달
        - 파일을 기능별로 세분화하여 라우팅 주소 변경
    - MVC 패턴에 대해 학습하여 모듈화 패턴에 맞추어 프로젝트 아키텍쳐를 구현
        - 추상화 단계에 따라 함수를 분류 및 기능별 모듈화 작업

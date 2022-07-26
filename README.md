# ☕️ caffeineMarket

> 🧷 <a href="https://secondlinefirefist.github.io/caffeineMarket">배포 URL</a>

## **프로젝트 소개**

커피를 좋아하는 현대인이라면 손쉽게 로그인하여 커피와 관련된 상품을 판매하고 일상을 공유할 수 있는 SNS 서비스입니다.  커피와의 일상을 게시글로 공유하며 좋아요와 댓글을 통해 사용자와 소통합니다. 다양한 사람들을 팔로우하고, 마음에 드는 피드가 있다면 '좋아요'를 누르거나 댓글을 달 수도 있습니다. 또한, 다른 사용자와 채팅창을 이용해 즐거운 대화도 나눌 수 있습니다.
## :fire: 2호선 불주먹팀

|김민영|김지수|김태희|채지훈|
|:-----------:|:-----------:|:-----------:|:-----------:|
| <img width="180px" src="https://user-images.githubusercontent.com/101693495/180898054-cf7cbf5c-0476-402b-b7bd-a088ffd6d126.jpg">| <img width="180px" src="https://user-images.githubusercontent.com/101693495/180899475-794fd51c-cef7-4154-b452-aeda89dd6f09.png"> | <img width="180px" src="https://user-images.githubusercontent.com/101693495/180899712-35607b00-3b6f-408d-8f7f-568a60072be9.jpg"> |<img width="180px" src="https://user-images.githubusercontent.com/101693495/180897571-3f123fcb-517b-4c82-83be-af644a98c973.jpg">|
|🔗 <a href="https://github.com/BradleyyKim">BradleyyKim</a>|🔗 <a href= "https://github.com/jsk3342">jsk3342</a>|🔗 <a href="https://github.com/greenT-Hee">greenT-Hee</a>|<a href ="https://github.com/jihoon-chae">🔗 jihoon-chae</a>|



## 1. 목표
- API를 이용한 SNS 프론트엔드 개발 구현.


## 2. 개발 환경 

### 2.1 스택
* Front-End : HTML CSS JavaScript
* Back-End : 제공된 API 사용
* 버전 관리 및 이슈 : Github, Jira, Notion, Slack
* 디자인 : Figma

## 3. 프로젝트 구조와 개발 일정
### 3.1 프로젝트 구조
```
.
├──📁 node_modules
├──📁 src
│   ├──📁 pages
│   │   ├── template
│   |   └── ...html
│   ├──📁 css
│   ├──📁 img
│   └──📁 js
│      
├──📁 router
│   ├── market.js
└── app.js
```

## 4. 역할 분담

### 👨🏻‍🚒 김지수
- splash 구현
- 로그인 기능 구현
- 회원가입 구현
- 프로필 수정 구현

### 👨🏻‍🚒 김민영
- 게시물 작성 구현
   - 여러 사진 업로드 POST 및 UI 구현
   - 텍스트 POST 구현 
- 게시글 상세 페이지 구현
   - 게시물 API를 통해 UI 구현
   - 로그인 토큰을 통해 개인 프로필 댓글 작성 기능 구현

### 👨🏻‍🚒 채지훈
#### 1) 상품등록 (product)

- 이미지 업로드 기능 구현
- 상품 데이터 POST 요청

#### 2) 상품수정(productModification)

- 이미지 업로드 기능 구현
- 상품 데이터 GET요청
- 상품 데이터 PUT요청

#### 3) 채팅방(chatRoom) 

- 텍스트 입력후 전송 버튼 클릭시 채팅창에 렌더링
- 이미지 업로드시 채팅창에 렌더링

### 👷🏻‍♀️ 김태희
#### 1)  myProfile & yourProfile 
- 유저 정보 API GET 
- 상품 리스트 API GET, DELETE
- 게시글 리스트 API GET, DELETE
- 공용 및 프로필 모달  기능 구현
- 로그아웃 기능 구현

#### 2) follwing & follower
- 팔로잉/ 팔로우 API GET, DELETE, POST
- 팔로우 버튼 누르면 숫자 증가  
- 팔로우 취소 버튼 누르면 숫자 감소

#### 3) 좋아요 기능 
- 좋아요 API POST, DELETE 요청

## 개발 기간
2022.06.09 ~ 2022.07.31

# YAM(Yours And Mine) - 지역기반 물품 대여 서비스
<img width="328" alt="얌로고" src="https://user-images.githubusercontent.com/60912550/145173848-8ae886a4-d0a9-425e-8e64-6b11cc5d4a12.png">

<br/>

## 0. 목차
[1. YAM 소개](#1-YAM-소개)<br/>
[2. 서비스 화면](#2-서비스-화면)<br />
[3. 핵심기능](#3-핵심기능)<br/>
[4. 기술 스택 및 아키텍처](#4-기술-스택-및-아키텍처)<br/>
[5. 설계](#5-설계)<br />
[6. 팀원 소개](#6-팀원-소개)<br />
[7. 개발 후 느낀점](#7-개발-후-느낀점)<br /><br />


## 1. YAM 소개

> 평소에 한번만 사용하고 더이상 사용하지 않는 물건이 있거나,  <br />
필요하지만 사기에는 아까웠던 경우가 있으신가요?🤔 <br /><br />
`YAM` 은 이러한 물건들을 **위치정보에 기반**하여 근처의 사용자들끼리 **대여**할 수 있는 서비스를 제공합니다.
자주 사용하지 않는 물건을 빌려주고 수익을 창출해보세요!🤑

- 주제 : 위치기반 물품 대여 모바일 웹 서비스
- 개발기간 : 2021.10.12 ~ 2021.11.19
<br /><br />

## 2. 서비스 화면
- ### 메인
    <img src="https://imgur.com/SgDfi2l.gif" alt="메인" width="800" /> <br />
- ### 채팅
    <img src="https://i.imgur.com/MzfJ0fp.gif" alt="채팅" width="800" /> <br />
- ### 일정관리
    <img src="https://i.imgur.com/SeQC6IY.gif" alt="일정관리" width="800" /> <br />
- ### 카테고리 검색
    <img src="https://i.imgur.com/wMoR8J5.gif" alt="카테고리 검색" width="800" /> <br />
<br /><br />

## 3. 핵심기능
- 서비스설명 : 지역 기반 물품 대여 서비스
- 주요기능
    - 카카오 주소 검색 API를 통한 지역 
    - 카테고리별 물품 검색을 통해 빠르게 원하는 물품 획득
    - 구매자와 판매자가 소통할 수 있는 1대1 채팅
    - 대여 관련 한 눈에 알아보기 쉬운 일정 캘린더
<br /><br />


## 4. 기술 스택 및 아키텍처
<img src="https://img.shields.io/badge/Java-8-007396?style=flat-square&logo=Java&logoColor=white"/> <img src="https://img.shields.io/badge/Spring-2.5.4-6DB33F?style=flat-square&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-8.0.23-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/JPA-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/> <img src="https://img.shields.io/badge/Redis-cd5d57?style=flat-square&logo=Redis&logoColor=white"/> <br />
<img src="https://img.shields.io/badge/React.js-17.0.2-61DAFB?style=flat-square&logo=React&logoColor="/> <img src="https://img.shields.io/badge/VisualStudio Code-0078d7?style=flat-square&logo=VisualStudioCode&logoColor=white"/> <img src="https://img.shields.io/badge/HTML-269539?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/><br />
<img src="https://img.shields.io/badge/AWS EC2-ff9900?style=flat-square&logo=Amazon&logoColor=white"/> <img src="https://img.shields.io/badge/AWS S3-ff9900?style=flat-square&logo=Amazon&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/Jenkins-red?style=flat-square&logo=Jenkins&logoColor=black"/> <img src="https://img.shields.io/badge/NGINX-269539?style=flat-square&logo=NGINX&logoColor=black"/> <img src="https://img.shields.io/badge/JMeter-red?style=flat-square&logo=JMeter&logoColor=red"/><br />
<img src="https://img.shields.io/badge/GitLab-FCA121?style=flat-square&logo=GitLab&logoColor=black"/>   <img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white"/> <img src="https://img.shields.io/badge/Mattermost-blue?style=flat-square&logo=Mattermost&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-black?style=flat-square&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Discord-navy?style=flat-square&logo=Discord&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-orange?style=flat-square&logo=Postman&logoColor=white"/><br /><br />
### Backend
- Spring boot
- Java 8
- MySQL
- JPA
- Redis
- IntelliJ
### Frontend
- React.js
- Visual Studio Code
- HTML
- CSS
- JavaScript
- BootStrap
### DevOps
- AWS EC2
- AWS S3
- Docker
- Jenkins
- Nginx
- Jmeter
### 협업도구
- Gitlab
- Jira
- Mattermost
- Notion
- Discord
- Postman

<br /><br />

## 5. 설계
- ### 기능명세서
![기능명세서](https://user-images.githubusercontent.com/60912550/145166698-9af10998-61b5-434a-8872-bad3b85af2d1.jpg)

- ### ERD
<img src="https://user-images.githubusercontent.com/60912550/145166205-9b757433-3b43-4e6d-a6c2-00c19421bed5.png" alt="DBERD" width="800" />

- ### WireFrame
<img src="https://user-images.githubusercontent.com/60912550/145166059-f97a733e-7aca-46f5-affd-5f2864971135.JPG" alt="와이어프레임" width="800" />

### Git 컨벤션
```
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우(ex> Swagger)
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제
```


### Git-flow의 브랜치

`master`: 제품으로 출시(배포)할 수 있는 브랜치 <br />
`develop`: 다음 버전을 개발하는 브랜치 <br />
`feature`: 단위별로 기능을 개발하는 브랜치 (완료되면 `develop` 브런치와 병합) <br />

### Git feature branch 명명 규칙
feature/{front or back}/{기능}
- ex) feature/back/login
- ex) feature/front/calendar
<br /><br />

## 6. 팀원 소개


|                                                                   이진호                                                                    |                                                                    권영린                                                                    |                                                                    김민재                                                                    |                                                                    윤영은                                                                    |                                                                    황성현                                                                    |
|:-------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://user-images.githubusercontent.com/60912550/136307383-a06166e6-2c28-4626-9723-6696e0d7ae9d.png" alt="이진호" width="130"/> | <img src="https://user-images.githubusercontent.com/60912550/142339921-5c44a30a-c75f-4f73-8aac-602b8fde1594.jpeg" alt="권영린" width="130"/> | <img src="https://user-images.githubusercontent.com/60912550/142338138-c29fc7c5-08b5-4e91-9772-ec0386be23d5.jpeg" alt="김민재" width="130"/> | <img src="https://user-images.githubusercontent.com/60912550/142337551-3c46a4ff-c939-4ba7-9023-2575c1147adc.jpeg" alt="윤영은" width="130"/> | <img src="https://user-images.githubusercontent.com/60912550/142337719-ee6b2be5-fbbc-4e96-b24e-1df0dc9de1ad.jpeg" alt="황성현" width="130"/> |
|                                                              Leader & Backend                                                               |                                                                   Backend                                                                    |                                                                   Frontend                                                                   |                                                                   Backend                                                                    |                                                                   Frontend                                                                   |
|                                                 [@jinho-pca](https://github.com/jinho-pca)                                                  |     [@kwonyl14](https://github.com/kwonyl14)                                                                                                                                         | [@Min-JaeKim](https://github.com/Min-JaeKim)                                                                                                                                             |                                                [@yeongeun109](https://github.com/yeongeun109)                                                |                                                 [@hsh0321](https://github.com/hsh0321)                                                                                              |
<br /><br />

## 7. 개발 후 느낀점
- 설계를 꼼꼼히 해야 개발이 빨리 진행됨을 느꼈다.
- 매일 스크럼과 피드백뿐만 아니라 지속적인 코드 리뷰와 테스트 배포가 필요하다는 것을 느꼈다.
- 앞으로 부하테스트를 통해 문제점이 발견된 api를 개선하고 싶다.
- 팀 분위기가 좋을수록 협업의 결과가 더 좋다!

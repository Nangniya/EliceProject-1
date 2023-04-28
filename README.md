## 🏡전국소품자랑

###인테리어 소품을 판매하는 쇼핑몰

** 제품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다. **
1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD** 
2. **제품 목록**을 조회 및, **제품 상세 정보**를 조회 가능함. 
3. 장바구니에 제품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 localStorage에서 저장 및 관리됨 



<br />

### API 문서

### http://34.64.90.77/docs

<br>



### 데모 영상

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
| ![image](https://i.ibb.co/XJkWmLK/main.gif) | ![image](https://i.ibb.co/6cSWKp4/register.gif) |
|    메인 페이지                                |      회원가입 화면                            |
| ![image](https://i.ibb.co/mqQmJy3/login.gif) | ![](https://i.ibb.co/h27Cd37/admin.gif)                                        |
|    로그인 페이지                              |     관리자 페이지                         |

<br />


## 기술 스택

![image](https://i.ibb.co/XD39Hk9/techstack.png)

<br />


## Collaboration Tools

- Figma : 초반 기획시 빠른 레이아웃을 잡기 위해 사용
- Goggle Sheet : 필요한 데이터 주고받는 input, output 설정
- swagger : API 요청 양식 공유
- Discord : 화면공유로 서로 도움주고 , 수시로 스크럼 잡는 용도
- Gitlab : Code Repository
- Postman Teams : API 테스트 진행

## Scrum

- 평일 아침 10시, 저녁 9시 Discord 회의
- 어제할일, 오늘할일, 막히는 상황 스크럼 회의때 공유
- 필요시 수시로 프론트/백엔드/전체 스크럼 잡아서 진행



## 인프라 구조

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

### 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

<br />

### 데이터 구조

![image](https://media.discordapp.net/attachments/1096002327334375504/1100987485766553611/image.png?width=966&height=427)<br />

## 제작자

| 이름 | 담당 업무 |
| ------ | ------ |
| 이준희 | FE(팀장) |
| 김봉섭 | BE |
| 이용섭 | FE |
| 박세진 | FE |
| 김나연 | FE |
| 이정민 | FE |

<br />

### 프론트엔드

- **Vanilla javascript**, html, css (**Bootstrap css**)
- Daum 도로명 주소 api 
- 이외
- 준희
  - 상품 상세 페이지, 장바구니 페이지 
- 나연
  - 로그인, 회원가입 페이지, 관리자 페이지
- 용섭
  - 쇼핑몰 메인 홈페이지, nav
- 세진
  - 주문 조회 페이지, 주문 결제 페이지

### 백엔드 

- **Nest**
- Mongodb, Mongoose
- cors
- **봉섭**


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

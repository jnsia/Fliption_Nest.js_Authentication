## 플립션 소프트웨어 엔지니어 과제

### 소개

> SSAFY 채용박람회를 통해 플립션에 지원한 김준수입니다. 문제 3에 대한 답변으로 Nest.js 기반의 인증 서버를 구현하였습니다.

### 구현 기간

2024.06.12 ~ 2024.06.13

### 목표

- Nest.js 기반으로 사용자 인증 서버 구현
- JWT 기반으로 access_token과 refresh_token을 활용한 인증 및 인가 구현

### 성과

- 공식문서를 통해 Nest.js의 기초적인 사용법을 익힘 
- passport 라이브러리의 사용 목적과 Nest.js에서의 사용 방법을 알게 되었음
- 다른 백엔드 프레임워크와 비교하면서 구현할 수 있어서 재밌었음

### 어려웠거나 아쉬운 점

- AuthGuard 적용 시, 모듈 간의 순환 참조 현상이 발생하였는데, forwardRef 함수를 통해 순환 참조가 발생하지 않게 함
- passport를 활용한 auth guard에서 canActivate의 작동 방식를 이해하는 것이 오래 걸림
- 예외 처리 방식과 폴더 구조를 더 깔끔하게 정리할 수 있을 것 같은데, 마땅한 방법이 떠오르지 않음

### 프로젝트 실행

- 패키지 설치

```bash
npm install
```

- mysql 설정

```sql
CREATE SCHEMA `fliption`;

use fliption;

create user 'fliption'@'localhost' identified by 'fliption';
create user 'fliption'@'%' identified by 'fliption';

grant all privileges on fliption.* to 'fliption'@'localhost';
grant all privileges on fliption.* to 'fliption'@'%';
```

- 서버 실행

```bash
npm run start:dev
```

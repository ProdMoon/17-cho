# [17초] 프론트엔드 서버

## 배포 가이드라인

배포를 위해서는, 다음 코드를 변경해 주어야 합니다.

### frontend/src/Admin/Admin.js

  - application server의 주소 부분입니다. (통상 백엔드 서버)

  - 아래 코드의 `localhost`를 public ip (i.e. 3.36.108.84)로 변경합니다.   
    필요하면 포트도 변경해주어야 합니다.

  - `const APPLICATION_SERVER_URL = 'http://localhost:5000/';`

### frontend/src/setupProxy.js

  - http-proxy-middleware를 위한 설정입니다.  
    현재는 React(nodejs) 서버가 proxy의 역할도 하고 있습니다.

  - setupProxy.js에 있는 모든 target에 대해 바꿔주어야 합니다.
  
  - `target: 'http://localhost:8080',`  
    ...

### frontend/src/Broadcasting/Chat.js
  
  - 채팅 기능에서 새로운 websocket 연결을 만들 때 사용하는 주소를 바꿔주어야 합니다.

  - `const socket = new SockJS('http://localhost:8080/ws');`
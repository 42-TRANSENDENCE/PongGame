# PongGame
multi-player web pong game.  

<p align="center">
 <img width="500" alt="image" src="https://user-images.githubusercontent.com/60467872/218838147-fe3fc0f1-b246-4a90-bbf6-7c8f14b73a04.png">  
</p>  
<p align="center">
 <em>sample image</em>
</p>  


1. ```make```
2. 각 컨테이너에 접속  
```ssh root@localhost -p _portnum_``` (4222 for front, 4223 for back)
3. 각 위치에서 ```yarn install```; ```yarn start;```
4. localhost:3000으로 접속  
   ```back/src/index.js```와 ```front/src/App.js```에서 ```localhost```를 _local ip_ 로 바꿔야 외부의 같은 네트워크에서 접속 가능함
***

# TODO
## NinjaCode
#### Goal (~2/19)
- [x] ~서버에서 공 위치 계산~ (2/15)
- [x] ~클라이언트의 키보드 입력 서버로 전송~ (2/14)
- [x] ~클러이언트로부터 받은 키 입력에 따라 패들 위치 계산~ (2/15)
- [x] ~공과 패들 위치 서버에서 해당 소켓에 연결된 모든 클라이언트에 전송~ (2/14)
- [x] ~벽이나 패들과 공의 충돌 처리~ (2/15)
- [ ] 새로고침시 정보가 중복되지 않게 함
- [ ] Scoring 구현 및 점수 표시
- [ ] 하나의 개임 채널 후 들어올 수 있는 사람 제한하는 기능 구현
- [ ] 여러개의 게임 채널 구현
- [ ] 관전 가능 여부 구현
- [ ] 키보드 이벤트 처리 최적화
## TypeScript & React
#### Goal (~미정)
- [ ] 다시 공부
- [ ] TypeScript로 코드 다시 작성
## Refactoring
#### Goal (미정~)
- [ ] DB, backend와 합치기

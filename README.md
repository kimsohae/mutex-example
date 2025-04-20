## 개요

`async-mutex` 활용한 토큰 갱신 요청 처리 예제입니다.

### token-renewal-test-before.js

`async-mutex` 적용 전:
실행 결과
```
[🔍] [Req#1] 사용 토큰: expired-token
[⚠️] [Req#1] 401
[🔄] 토큰 갱신 요청
[🔍] [Req#2] 사용 토큰: expired-token
[⚠️] [Req#2] 401
[🔄] 토큰 갱신 요청
[🔍] [Req#3] 사용 토큰: expired-token
[⚠️] [Req#3] 401
[🔄] 토큰 갱신 요청
[✅] 갱신 완료: new-token-784
[♻️] [Req#1] 새로운 토큰으로 요청: new-token-784
[✅] 갱신 완료: new-token-870
[♻️] [Req#2] 새로운 토큰으로 요청: new-token-870
[✅] 갱신 완료: new-token-736
[♻️] [Req#3] 새로운 토큰으로 요청: new-token-736


```



### token-renewal-test.js
`async-mutex` 적용 후
실행 결과:
```
[🔍] [Req#1] 사용 토큰: expired-token
[⚠️] [Req#1] 401
[🔄] 토큰 갱신 요청
[🔍] [Req#2] 사용 토큰: expired-token
[⚠️] [Req#2] 401
[🔍] [Req#3] 사용 토큰: expired-token
[⚠️] [Req#3] 401
[✅] 갱신 완료: new-token-324
[♻️] [Req#1] 새로운 토큰으로 요청: new-token-324
[♻️] [Req#2] 새로운 토큰으로 요청: new-token-324
[♻️] [Req#3] 새로운 토큰으로 요청: new-token-324
```


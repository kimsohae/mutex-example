// token-renewal-test.ts

import { Mutex } from 'async-mutex';

// 가짜 토큰
let accessToken = 'expired-token';

// Mutex
const tokenMutex = new Mutex();

// 가짜 토큰 갱신 요청
const requestRefreshToken = async () => {
  console.log('[🔄] 토큰 갱신 요청');
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
  accessToken = 'new-token-' + Math.floor(Math.random() * 1000);
  console.log('[✅] 갱신 완료:', accessToken);
  return accessToken;
};

// 현재 토큰 얻기
const getAccessToken = () => accessToken;

// 핵심 함수
const renewAuthenticationToken = async () => {
 // 1. lock 상태라면, getAccessToken을 호출하여 재발급된 토큰을 그대로 사용한다
 if (tokenMutex.isLocked()) {
  await tokenMutex.waitForUnlock();
  return getAccessToken();
}

// 2. unlock 상태라면, 재발급을 요청한다. 
// 이 때, 요청 전에 mutex를 획득하여 lock 상태로 전환하고
// 완료되면 release하여 unlock 상태로 변경한다.
tokenMutex.acquire();
const accessToken = await requestRefreshToken();
tokenMutex.release();
return accessToken;

};

// 401 응답을 흉내내는 가짜 fetch
const fakeFetch = async (id) => {
  const token = getAccessToken();
  console.log(`[🔍] [Req#${id}] 사용 토큰: ${token}`);

  // 401 흉내내기
  if (token === 'expired-token') {
    console.log(`[⚠️] [Req#${id}] 401`);
    const newToken = await renewAuthenticationToken();
    console.log(`[♻️] [Req#${id}] 새로운 토큰으로 요청: ${newToken}`);
    return `Response with ${newToken}`;
  }

  return `Response with ${token}`;
};

// 병렬 요청 시뮬레이션
const simulateParallelRequests = async () => {
  const requestPromises = [];

  for (let i = 1; i <= 3; i++) {
    requestPromises.push(fakeFetch(i));
  }

  const results = await Promise.all(requestPromises);
  console.log('\n📦 All responses:');
  results.forEach((res, i) => console.log(`[Res#${i + 1}] ${res}`));
};

simulateParallelRequests();



// 가짜 토큰
let accessToken = 'expired-token';


// 가짜 토큰 갱신 요청
const requestRefreshToken = async () => {
  console.log('[🔄] 토큰 갱신 요청');
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
  accessToken = 'new-token-' + Math.floor(Math.random() * 1000);
  console.log('[✅] 갱신 완료:', accessToken);
  return accessToken ;
};

// 현재 토큰 얻기
const getAccessToken = () => accessToken;

// 핵심 함수
const renewAuthenticationToken = async () => {
  const accessToken = await requestRefreshToken();
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

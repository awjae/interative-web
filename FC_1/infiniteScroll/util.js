const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;

export const randomTimer = (func, ...args) => (resolve) => {
  setTimeout(() => resolve(func(...args)), getRandomSeconds());
};

export const debounce = (func, delay) => {
  /**
   * setTimeout 실행시 태스크 아이디를 저장
   */
  let timeoutId = null;
  return (...args) => {
    /**
     * 이미 실행 대기중인 태스크가 존재하는 경우 해당 태스크를 제거
     */
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    /**
     * 입력받은 `delay 후에 해당 함수가 실행되도록 `setTimeout` 실행
     */
    
    timeoutId = setTimeout(func, delay, ...args);
  }
};

export const dummyFetcher = (method, args) =>
  new Promise(randomTimer(method, args));

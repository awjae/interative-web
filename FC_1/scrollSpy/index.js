const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
// const offsetTops = contentItems.map((elem) => {
//   const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
//   return [ofs - clh / 2, ofs + clh / 2];
// });

// window.addEventListener("scroll", (e) => {
//   const { scrollTop } = e.target.scrollingElement;
//   // do something
//   const targetIndex = Math.max(
//     offsetTops.findIndex(([from, to]) => scrollTop >= from && scrollTop < to),
//     0
//   );
//   Array.from(navElem.children).forEach((c, i) => {
//     c.classList[i === targetIndex ? "add" : "remove"]("on");
//   });
// });

navElem.addEventListener("click", (e) => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

const activeButtonEls = document.querySelectorAll("#nav > li")
let latestActiveButtonEl = activeButtonEls[0];

const scrollSpyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const {
      isIntersecting,
      boundingClientRect
    } = entry;
    /**
     * 페이지의 현재 스크롤 위치
     */
    const scrollTop = window.pageYOffset;
    /**
     * Intersection 이벤트 발생한 요소의 높이 값
     */
    const { height } = boundingClientRect;

    if (isIntersecting) {
      /**
       * 스크롤 위치 / 요소의 높이 = 반올림 ⇒ 현재 요소의 위치
       */
      const index = Math.round(scrollTop / height);
      const activeButtonEl = activeButtonEls[index];
      /**
       * 마지막 활성된 버튼에서 `on` 클래스를 제거
       */
      latestActiveButtonEl.classList.remove('on');
      /**
       * 현재 보여지는 요소와 동일한 순번에 있는 버튼에 `on` 클래스 추가
       */
      activeButtonEl.classList.add('on');
      /**
       * 현재 활성된 버튼 요소를 `latestActiveButtonEl`에다 저장
       */
      latestActiveButtonEl = activeButtonEl;
    }
  })
}, {
  /**
   * 화면에 해당 요소가 50% 이상 보여지면 Intersection 이벤트 발생
   */
  threshold: .5
});

/**
 * `content` 하위 `div` 요소들을 Intersection 감시 요소로 등록
 */
contentItems.forEach((contentEl) => {
  scrollSpyObserver.observe(contentEl);
});;

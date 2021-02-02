//
$(document).on('click', 'a[href="#"]', (e) => {
    e.preventDefault();
})

//slick.js
window.onload = () => {
    $('.visual .slide').slick({
        arrows: false, //화살표
        dots: false, //인디케이스 해제
        fade: true, // 페이드 효과
        autoplay: true, // 자동재생
        autoplaySpeed: 4000, //재생시간
        pauseOnHover: false, //마우스 호버시 정지
        parseOnFocus: false, //포커스시 정지
        infinite: true
    })
}

//탭메뉴
(() => {
    $('.introduce .roomInfo .tab li a').on('click', (evt) => {
        const num = $('.introduce .roomInfo .tab li a').index($(evt.currentTarget));
        $('.introduce .roomInfo .tabBox.on').removeClass('on');
        $('.introduce .roomInfo .tabBox:eq('+ num +')').addClass('on');
    });
})();

//scroll
(() => {
    $('.animate').scrolla({
        mobile: true,
        once: false
    });
})();

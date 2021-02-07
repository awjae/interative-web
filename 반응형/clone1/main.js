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

    $('.intro_dining .slide2').slick({
        arrows: false,  //화살표
        dots: false, //인디케이스 해제
        fade: false,//페이드효과
        autoplay: true,//자동재생
        autoplaySpeed:4000,// 재생시간
        pauseOnHover: false,//마우스 호버시 정지
        pauseOnFocus: false //포커스시 정지
    });
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


//패밀리 사이트
$(function(){
    $('.txt_wrap .btn_fam ').on('click', function(){
        $('.fam_site_wrap .item_wrap').slideToggle();
    });
});

//햄버거버튼
$(function(){
    $('header .menuOpen').on('click', function(){
        $('header .menuWrap').addClass('on');
    });
    $('.menuWrap .close').on('click', function(){
        $('.menuWrap').removeClass('on');
    });
});

//헤더 이벤트
var scrollTop = 0;
scrollTop = $(document).scrollTop();

$(window).on('scroll resize', function(){
    scrollTop = $(document).scrollTop();
    fixHeader();
});

function fixHeader(){
    if( scrollTop > 200) { $('header').addClass('on'); }
    else{ $('header').removeClass('on'); }
} 

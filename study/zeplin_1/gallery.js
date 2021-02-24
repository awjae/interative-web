import bottomNav from './bottomNav.js';

const gallery = {};

const THUBNAIL_LIST = [
    { title : 'sea', path: './image/category_1.jpg' },
    { title : 'ani', path: './image/category_2.jpg' },
    { title : 'flower', path: './image/category_3.jpg' },
    { title : 'game', path: './image/category_4.jpg' },
    { title : 'cat', path: './image/category_5.jpg' },
    { title : 'squirrel', path: './image/category_6.jpg' },
    { title : 'mark1', path: './image/category_7.jpg' },
    { title : 'bird', path: './image/category_8.jpg' },
    { title : 'mark2', path: './image/category_9.jpg' },
    { title : 'leaf', path: './image/category_10.jpg' }
];

const IMAGE_LIST = [
    { title : 'image_2', category : 'game', path : './image/image_2.jpg', seq : '0002' },
    { title : 'image_1', category : 'game', path : './image/image_1.jpg', seq : '0001'},
    { title : 'image_3', category : 'game', path : './image/image_3.jpg', seq : '0003' },
    { title : 'image_4', category : 'game', path : './image/image_4.jpg', seq : '0004' },
    { title : 'image_5', category : 'game', path : './image/image_5.jpg', seq : '0005' },
    { title : 'image_6', category : 'game', path : './image/image_6.jpg', seq : '0006' },
    { title : 'image_7', category : 'game', path : './image/image_7.jpg', seq : '0007' },
    { title : 'image_8', category : 'game', path : './image/image_8.jpg', seq : '0008' },
    { title : 'image_9', category : 'game', path : './image/image_9.jpg', seq : '0009' },
    { title : 'image_10', category : 'game', path : './image/image_10.jpg', seq : '0010' }
];


gallery.init = (rootEl) => {
    gallery.setHeader(rootEl);
    gallery.setThumbnail(rootEl);
    gallery.setImages(rootEl);
}

gallery.setHeader = (rootEl) => {

    const headerHTML = '<header><h1>Illustrations</h1><h4>CURATED GALLERIES</h4></header>';
    rootEl.insertAdjacentHTML('afterbegin', headerHTML);

}

gallery.setThumbnail = (rootEl) => {

    const categoryEl = document.createElement('section');
    categoryEl.className = 'category';
    THUBNAIL_LIST.forEach(el => {
        const wrapper = document.createElement('figure');
        wrapper.insertAdjacentHTML('afterbegin', `<img src='${el.path}' alt='${el.title}' /><figcaption><a href='#'>${el.title}</a></figcaption>`);
        categoryEl.insertAdjacentElement('beforeend', wrapper);
    })
    rootEl.insertAdjacentElement('beforeend', categoryEl);

}

gallery.setImages = (rootEl) => {
    const categoryEl = document.createElement('section');
    categoryEl.className = 'images-wrapper';
    rootEl.insertAdjacentElement('beforeend', categoryEl);

    for (let i = 0; i < 10; i++) {
        //const contents = `<figure><a href='#'><img src='${IMAGE_LIST[i].path}' alt='${IMAGE_LIST[i].title}'/></a></figure>`;
        const img = new Image();
        img.src = IMAGE_LIST[i].path;
        img.onload = () => {
            const ratio = img.width/img.height;
            const contentsWrapper = document.createElement('a');
            const contents = document.createElement('img');
            contentsWrapper.href = 'javascript:void(0)'
            contentsWrapper.insertAdjacentElement('afterbegin', contents);
            contents.src = IMAGE_LIST[i].path;
            contents.alt = IMAGE_LIST[i].title;
            
            if (ratio >= 1.5) {
                contents.style.width = '315px';
                contents.style.height = '120px';
                contentsWrapper.style.gridColumn = 'span 2';
            } else if (ratio <= 0.7) {
                contents.style.width = '150px';
                contents.style.height = '255px';
                contentsWrapper.style.gridRow = 'span 2';
            } else {
                contents.style.width = '140px';
                contents.style.height = '120px';
            }

            contents.onclick = () => gallery.setImageOnClickHandler(contents);
            
            categoryEl.insertAdjacentElement('beforeend', contentsWrapper);
        }
    }
}

gallery.setImageOnClickHandler = (element) => {
    const popupEl = document.querySelector('#popup');
    popupEl.classList.add('active');
    const img = document.createElement('img');
    img.src = element.src;
    img.classList.add('active');
    popupEl.insertAdjacentElement('beforeend', img);
    document.body.style.overflow = 'hidden';

    popupEl.querySelector('i').onclick = gallery.popupClose;

    window.history.pushState({ data: 'some data' },'Some history entry title', location.pathname + '/image/' + element.alt);

    //상세보기
    bottomNav.setOverview();
}

gallery.popupClose = () => {
    const popupEl = document.querySelector('#popup');
    popupEl.classList.remove('active');
    popupEl.innerHTML = '<i class="fas fa-chevron-left"></i>';
    document.body.style.overflow = 'auto';
    window.history.pushState({ data: 'some data' },'Some history entry title', '/study/zeplin_1/zeplin_1.html');

    bottomNav.cleanUp();
    bottomNav.setNav();
    bottomNav.setRect();
}

export default gallery;
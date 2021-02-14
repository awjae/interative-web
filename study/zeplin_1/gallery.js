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
    categoryEl.className = 'grid-stack images-wrapper';
    rootEl.insertAdjacentElement('beforeend', categoryEl);
    gallery.grid = GridStack.init();

}

export default gallery;
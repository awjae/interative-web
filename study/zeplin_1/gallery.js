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
    { title : '', category : 'game', path : './image/image_1.jpg', seq : '0001'},
    { title : '', category : 'game', path : './image/image_2.jpg', seq : '0002' },
    { title : '', category : 'game', path : './image/image_3.jpg', seq : '0003' },
    { title : '', category : 'game', path : './image/image_4.jpg', seq : '0004' },
    { title : '', category : 'game', path : './image/image_5.jpg', seq : '0005' },
    { title : '', category : 'game', path : './image/image_6.jpg', seq : '0006' },
    { title : '', category : 'game', path : './image/image_7.jpg', seq : '0007' },
    { title : '', category : 'game', path : './image/image_8.jpg', seq : '0008' },
    { title : '', category : 'game', path : './image/image_9.jpg', seq : '0009' },
    { title : '', category : 'game', path : './image/image_10.jpg', seq : '0010' }
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
            let width = '';
            let height = '';
            
            if (ratio >= 1.5) {
                //gallery.grid.addWidget({w: 6, h:3, content: contents, noMove: false, noResize: true, locked: false });
                width = '300px';
                height = '120px';
            } else if (ratio <= 0.6) {
                //gallery.grid.addWidget({w: 3, h:6, content: contents, noMove: false, noResize: true, locked: false });
                width = '150px';
                height = '240px';
            } else {
                //gallery.grid.addWidget({w: 4, h:4, content: contents, noMove: false, noResize: true, locked: false });
                width = '150px';
                height = '120px';
            }

            const contents = `<img src='${IMAGE_LIST[i].path}' alt='${IMAGE_LIST[i].title}' width='${width}' height='${height}'/>`;
            categoryEl.insertAdjacentHTML('beforeend', contents);
        }

        

        // const contents = document.createElement('figure');
        // const image = document.createElement('img');
        // image.src = IMAGE_LIST[i].path;
        // image.alt = IMAGE_LIST[i].title;
        // contents.insertAdjacentElement('afterbegin', image);
        // categoryEl.insertAdjacentElement('afterbegin', contents);
    }
    gridGallery({
        selector: '.images-wrapper',
        darkMode: false,
        layout: "square",
        gapLength: 4,
        rowHeight: 120,
        columnWidth: 150
    });
}

export default gallery;
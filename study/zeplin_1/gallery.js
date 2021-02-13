const gallery = {};

const THUBNAIL_LIST = [];


gallery.init = (rootEl) => {
    gallery.setHeader(rootEl);
}

gallery.setHeader = (rootEl) => {

    const headerHTML = '<header><h1>Illustrations</h1><h4>CURATED GALLERIES</h4></header>';
    rootEl.insertAdjacentHTML('afterbegin', headerHTML);

}

gallery.setThumbnail = (rootEl) => {

    const thumbnailHTML = document.createElement('section');
    


    rootEl.insertAdjacentHTML('afterbegin', headerHTML);

}


export default gallery;
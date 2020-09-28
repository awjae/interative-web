(() =>{

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');

    for (let i = 0; i < stepElems.length; i++) {
        stepElems[i].dataset.index = 1;
        graphicElems[i].dataset.index = 1;
     }

})();
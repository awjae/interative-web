const bottomNav = {};

const NAV = [
    { 
        seq : 'menu_1',
        name : '현위치',
        icon : 'location-arrow'
    },
    { 
        seq : 'menu_2',
        name : '갤러리',
        icon : 'th-large'
    },
    { 
        seq : 'menu_3',
        name : '메모',
        icon : 'edit'
    },
    { 
        seq : 'menu_4',
        name : '프로필',
        icon : 'user-alt'
    },
]

bottomNav.init = (rootEl) => {
    let bottomNavWrapper = '<section class="bottomNav-wrapper"><nav class="bottomNav"></nav></section>'
    rootEl.insertAdjacentHTML('beforeend', bottomNavWrapper);
    bottomNavWrapper = rootEl.querySelector('.bottomNav');
    bottomNav.setNav(bottomNavWrapper);
    bottomNav.setRect(bottomNavWrapper);
}

bottomNav.setNav = (wrapperEl) => {
    const bottomNavUl = document.createElement('ul');
    let bottomNavContents = '';
    NAV.forEach(menu => {
        bottomNavContents += `<li><a href="#"><i class="fas fa-${menu.icon}" title="${menu.name}" value="${menu.seq}"></i></a></li>`
    })
    bottomNavUl.insertAdjacentHTML('afterbegin', bottomNavContents);
    wrapperEl.insertAdjacentElement('afterbegin', bottomNavUl);
}

bottomNav.setRect = (wrapperEl) => {
    const bottomRectBtn = document.createElement('button');
    bottomRectBtn.className = 'bottomNav-rect_btn'

    wrapperEl.insertAdjacentElement('afterbegin', bottomRectBtn);
}

export default bottomNav;
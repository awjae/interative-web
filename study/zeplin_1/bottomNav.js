const bottomNav = {};

bottomNav.init = (rootEl) => {
    const bottomNav = '<section class="bottomNav-wrapper"><nav class="bottomNav"></nav></section>'
    rootEl.insertAdjacentHTML('beforeend', bottomNav);
}

bottomNav.setNav = () => {

}

export default bottomNav;
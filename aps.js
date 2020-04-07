window.addEventListener('load', () => {
    const navmenu = document.querySelector('.article-nav-actions');
    findAndAdd()
    const observer = new MutationObserver(findAndAdd);
    observer.observe(navmenu, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });
});

function findAndAdd() {
    if (document.getElementById('sci-hub') !== null) return;
    const navmenu = document.querySelector('.article-nav-actions');
    const button = document.createElement('a');
    const doiExtractor = new RegExp('/[^/]+/abstract/(.+)$');
    const DOI = window.location.pathname.match(doiExtractor)[1]
    button.href = `https://sci-hub.tw/${DOI}`;
    button.className = 'small button';
    button.innerText = 'Sci-Hub';
    button.id = 'sci-hub';
    navmenu.appendChild(button);
}
window.addEventListener('load', findAndAdd);
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.toolbar-container');
    findAndAdd()
    const observer = new MutationObserver(findAndAdd);
    observer.observe(container, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });
}); 

function findAndAdd() {
    if (document.getElementById('scihub') !== null) {
        return;
    }
    const xpath = '//a[@title="Persistent link using digital object identifier"]'
    const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    // if (matchingElement===null) return;
    const doiExtractor = new RegExp('https://doi.org/(.+)','');
    const DOI = matchingElement.innerText.match(doiExtractor)[1];
    const button = document.createElement('div')
    button.className = 'ExportCitation';
    button.id = 'scihub'
    button.innerHTML = `
        <a style="overflow: inherit" class="button button-anchor" href="https://sci-hub.tw/${DOI}">
        <span class="button-text">Sci-Hub</span>
        </a>
        `
    document.querySelector('div.toolbar-container div.buttons').appendChild(button);
}
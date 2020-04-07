window.addEventListener('load', () => {
    const xpath = "//h2[contains(text(),'Log in to view PDF')]/../div/div";
    const container = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
    if (document.getElementById('sci-hub') !== null) return;
    const matchingElement = document.querySelector('.meta-line');
    const doiExtractor = new RegExp('DOI: (.+)$','m');
    const DOI = matchingElement.innerText.match(doiExtractor)[1];
    const xpath = "//h2[contains(text(),'Log in to view PDF')]/../div/div";
    const container = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    const pane = document.createElement('div');
    pane.className = "panel-pane pane-custom pane-1";

    const paneContent = document.createElement('div');
    paneContent.className = "pane-content";
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = `https://sci-hub.tw/${DOI}`;
    a.innerText = 'via Sci-Hub';
    a.className = 'btn--cta';
    a.id = 'sci-hub';
    p.appendChild(a);
    paneContent.appendChild(p);
    pane.appendChild(paneContent);

    container.insertBefore(pane, container.childNodes[0]);
}
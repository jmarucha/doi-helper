window.addEventListener('hashchange', findAndAdd);
window.addEventListener('transitionend', findAndAdd);


function findAndAdd() {
    const xpath = "//span[contains(text(),'DOI')]/..";
    const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (matchingElement===null) return;
    if (matchingElement.innerText.endsWith('sci-hub')) return;
    const link = document.createElement('a');
    const DOI = matchingElement.querySelector('a').innerText
    link.style['margin-left']='3pt';
    link.innerText = '//sci-hub'; 
    link.href = `https://sci-hub.tw/${DOI}`;
    matchingElement.appendChild(link);
}
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrollToContinueWatching
    });
});

function scrollToContinueWatching() {
    const xpath = `//*[text()='Continue watching']`;
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const element = result.singleNodeValue;
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
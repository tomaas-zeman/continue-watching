chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrollToContinueWatching(tab),
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId },
            files: ['script.js'],
            function: moveContinueWatchingRow(tab),
        });
    }
});

function scrollToContinueWatching(tab) {
    if (tab.url.includes("skyshowtime")) {
        return function () {
            const xpath = `//*[text()='Pokračovat ve sledování']`;
            document
                .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (tab.url.includes("primevideo")) {
        return function () {
            const xpath = `//*[text()='Continue watching']`;
            document
                .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function moveContinueWatchingRow(tab) {
    if (tab.url.includes("skyshowtime")) {
        return function () {
            const xpath = `//div[.//h2[text()='Pokračovat ve sledování'] and contains(@class, 'section-container__tray-item')]`;
            const element = document
                .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue
            element.parentNode.insertBefore(element, element.parentNode.firstElementChild);
        }
    } else if (tab.url.includes("primevideo")) {
        return function () {
            const xpath = `//div[.//p[text()='Continue watching'] and contains(@class, '+OSZzQ')]`;
            const element = document
                .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue
            element.parentNode.insertBefore(element, element.parentNode.firstElementChild);
        }
    }
}
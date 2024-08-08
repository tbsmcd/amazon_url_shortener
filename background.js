chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "shortenAmazonURL",
        title: "Copy the shortened Amazon URL",
        contexts: ["page"],
        documentUrlPatterns: [
            "https://www.amazon.co.jp/*",
            "https://www.amazon.com/*"
        ]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "shortenAmazonURL") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: shortenAmazonURL
        });
    }
});
  
function shortenAmazonURL() {
    let url = window.location.href;
    let match = url.match(/(https:\/\/www\.amazon\.(co\.jp|com)).*\/dp\/([A-Z0-9]{10})/);
    if (match) {
        let shortenedURL = `${match[1]}/dp/${match[3]}/`;
        navigator.clipboard.writeText(shortenedURL).then(() => {
            window.postMessage({ type: 'SHOW_ALERT', message: `Shortened URL copied to clipboard:\n${shortenedURL}` }, '*');
    }).catch(err => {
        window.postMessage({ type: 'SHOW_ALERT', message: 'Could not copy text: ' + err }, '*');
    });
    } else {
        window.postMessage({ type: 'SHOW_ALERT', message: "This page does not contain a valid Amazon product URL." }, '*');
    }
}

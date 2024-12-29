// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome Extension installed");
});

// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
        console.log(`Tab updated: ${tab.url}`);
    }
});

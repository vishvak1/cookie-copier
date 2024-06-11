let currentSessionPairs = [];

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "updateCurrentSessionPairs") {
    currentSessionPairs = request.pairs;
  }
});

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getCurrentSessionPairs") {
    sendResponse({ pairs: currentSessionPairs });
  }
});
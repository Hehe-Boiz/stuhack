const targetDomains = [
    "www.studocu.com",
    "www.studeersnel.nl",
    "www.studocu.vn"
  ];
  
  // Xóa cookies liên quan đến domain
  chrome.webNavigation.onCommitted.addListener(details => {
    const url = new URL(details.url);
  
    if (targetDomains.includes(url.hostname)) {
      // Xóa cookies của trang
      chrome.cookies.getAll({ domain: url.hostname }, cookies => {
        cookies.forEach(cookie => {
          chrome.cookies.remove({
            url: `${url.protocol}//${cookie.domain}${cookie.path}`,
            name: cookie.name
          });
        });
      });
  
      // Inject script xóa localStorage và sessionStorage
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["storage-clear.js"]
      });
  
      console.log(`Cleared data for ${details.url}`);
    }
  });
  
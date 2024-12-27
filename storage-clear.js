// Xóa dữ liệu localStorage và sessionStorage
localStorage.clear();
sessionStorage.clear();

// Chặn thêm dữ liệu mới vào localStorage và sessionStorage
Object.defineProperty(document, "cookie", {
  get: () => "",
  set: () => {}
});

window.localStorage = new Proxy({}, {
  get: () => null,
  set: () => {}
});

window.sessionStorage = new Proxy({}, {
  get: () => null,
  set: () => {}
});

console.log("Cleared localStorage, sessionStorage, and cookies for this page.");

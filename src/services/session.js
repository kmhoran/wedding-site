export function getSessionItem(key, sessionStorage = false) {
  return JSON.parse(
    sessionStorage
      ? window.sessionStorage.getItem(key)
      : localStorage.getItem(key)
  );
}

export function saveSessionItem(key, data, sessionStorage = false) {
  if (sessionStorage) window.sessionStorage.setItem(key, JSON.stringify(data));
  else localStorage.setItem(key, JSON.stringify(data));
  return true;
}

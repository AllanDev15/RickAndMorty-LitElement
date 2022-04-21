import './components/Characters.js';
import './components/Character.js';

const root = document.querySelector('#root');

const routes = {
  '/characters': () => document.createElement('app-characters'),
  '/character/': () => document.createElement('character-view'),
};

export default function () {
  let path = validatePath(window.location.pathname);

  root.innerHTML = null;
  root.appendChild(routes[path]());
}

export function navigate(pathname) {
  window.history.pushState(null, null, window.location.origin + pathname);

  let path = validatePath(pathname);

  root.innerHTML = null;
  root.appendChild(routes[path]());
}

window.onpopstate = function () {
  const path = validatePath(window.location.pathname);

  root.innerHTML = null;
  root.appendChild(routes[path]());
};

function validatePath(actualPath) {
  let path = actualPath;

  if (actualPath === '/index.html' || actualPath === '/') {
    path = '/characters';
  } else if (actualPath.includes('/character/')) {
    path = '/character/';
  }

  return path;
}

export function navigateParams(path, params = {}) {
  const url = new URL(window.origin + path);

  for (const key in params) {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  }

  window.history.pushState(null, null, url);
}

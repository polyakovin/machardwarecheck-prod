export function normalizeBase(value = '/') {
  if (value === '' || value === '/') return '/';
  if (!/^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*\/?$/.test(value)) {
    throw new Error('BASE_PATH must be an absolute path such as /machardwarecheck-prod/');
  }
  return value.endsWith('/') ? value : `${value}/`;
}

export function appPath(base, route = '/') {
  return normalizeBase(base) + route.replace(/^\/+/, '');
}

export function routeForPath(base, pathname) {
  const prefix = normalizeBase(base);
  if (prefix !== '/' && pathname === prefix.slice(0, -1)) return '/';
  if (!pathname.startsWith(prefix)) return null;
  const route = '/' + pathname.slice(prefix.length);
  return route.replace(/\/+$/, '') || '/';
}

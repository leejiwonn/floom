const AUTH_TOKEN_KEY = '@@floom/auth-token';

export function getAuthTokenFromLocalStorage() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveAuthTokenInLocalStorage(authToken: string) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, authToken);
}

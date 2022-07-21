import jwtDecode from "jwt-decode";

export function setCookie(name, value, expireMinutes = 60 * 24 * 30) {
  const d = new Date();
  d.setTime(d.getTime() + expireMinutes * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;samesite=lax`;
}

export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i += 1) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

export function setToken(token) {
  setCookie("snapbookstoken", token);
}

export function deleteToken() {
  setToken("");
  deleteCookie("snapbookstoken");
}

export function getToken(token) {
  if (!token) {
    token = getCookie("snapbookstoken");
  }

  if (!token) {
    return null;
  }

  const decoded = token ? jwtDecode(token, { header: true }) : null;
  if (!decoded || decoded.exp < Date.now() / 1000) {
    return null;
  }

  return token;
}

export function getUserId() {
  const token = getToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.user_id;
  }

  return token;
}

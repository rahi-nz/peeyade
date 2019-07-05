import Cookies from "universal-cookie";

export function setCookie(name, value) {
  const cookies = new Cookies();
  cookies.set(name, value, { expires: new Date(Date.now() + 2592000) });
}
export function getCookie(name) {
  const cookies = new Cookies();
  cookies.get(name);
}

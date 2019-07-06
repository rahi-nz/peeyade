import Cookies from "universal-cookie";

export function setCookie(name, value, expire) {
  const cookies = new Cookies();
  cookies.set(name, value, { expires: new Date(expire) });
}
export function getCookie(name) {
  const cookies = new Cookies();
  cookies.get(name);
}

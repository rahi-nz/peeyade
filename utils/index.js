import Cookies from "universal-cookie";

export function setCookie(name, value, expires) {
  const cookies = new Cookies();
  cookies.set(name, value, expires);
}

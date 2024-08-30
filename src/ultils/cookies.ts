import cookies from "js-cookie";

export const getCookie = (name: string): string | undefined =>
  cookies.get(name);

export const setCookie = (
  name: string,
  value: string,
  expires: number = 1
): void => {
  cookies.set(name, value, { expires });
};

export const removeCookie = (name: string): void => {
  cookies.remove(name);
};

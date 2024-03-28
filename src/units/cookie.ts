import { type RequestEvent } from "@builder.io/qwik-city";

export function setCookie(request: RequestEvent, name: string, value: string) {
  const maxAge = 60 * 60 * 24 * 14;
  request.cookie.set(name, value, {
    httpOnly: true,
    expires: new Date(Date.now() + maxAge * 1000),
    maxAge,
  });
}

import {
  type RequestEvent,
  type RequestEventAction,
  routeLoader$,
} from "@builder.io/qwik-city";
import DEBUG from "debug";
import { isServer } from "@builder.io/qwik/build";
import type { RequestHandler } from "@builder.io/qwik-city";
import type { JWTPayload } from "jose";
import JWT from "~/units/jwt";
import DBSessions, { type Session } from "~/units/postgres/sessions";

const debug = DEBUG("auth");

interface SessionJWTPayload extends JWTPayload {
  userId: number;
  sessionIdentity?: string;
}

interface SessionAgent {
  userAgent: Session["userAgent"];
  city: Session["city"];
  country: Session["country"];
  ip: Session["ip"];
}

export const prefix: string = "/api/auth";

const ONE_MINUTE = 60;

const ONE_HOUR = ONE_MINUTE * 60;

const SESSION_IDENTITY = ONE_HOUR * 24 * 365 * 10;

const SESSION_REFRESH_EXPIRED = ONE_HOUR * 24;

const SESSION_ACCESS_EXPIRED = ONE_HOUR;

export const genNoise = function () {
  return Math.random().toString(32).substring(2, 11);
};

export const renewSession = async function (
  req: RequestEvent,
  userId: number,
  sessionIdentity: string,
  noise: string,
) {
  const log = debug.extend("renewSession");

  setCookie(req, "session-identity", sessionIdentity, SESSION_IDENTITY);
  log("session-identity", sessionIdentity);

  const jwt = new JWT(req.env);

  const refreshToken = await jwt.signRefresh({
    userId,
    sessionIdentity,
    noise,
  });
  setCookie(req, "refresh-token", refreshToken, SESSION_REFRESH_EXPIRED);
  log("refresh-token", refreshToken);

  const accessToken = await jwt.signAccess({ userId });
  setCookie(req, "access-token", accessToken, SESSION_ACCESS_EXPIRED);
  log("access-token", accessToken);
};

const setCookie = function (
  req: RequestEvent | RequestEventAction,
  name: string,
  token: string,
  maxAge: number | undefined = ONE_HOUR,
) {
  req.cookie.set(name, token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + maxAge * 1000).toUTCString(),
    sameSite: "lax",
    secure: true,
  });
};

const catchSessionAgent = function ({ request }: RequestEvent): SessionAgent {
  return {
    userAgent: request.headers.get("user-agent") || null,
    city: request.headers.get("x-vercel-ip-city") || null,
    country: request.headers.get("x-vercel-ip-country") || null,
    ip: request.headers.get("x-forwarded-for") || null,
  };
};

export const handleSession = async function (
  req: RequestEvent,
): Promise<SessionJWTPayload | null> {
  const log = debug.extend("handleSession");

  const accessToken = req.cookie.get("access-token")?.value;
  log("accessToken", accessToken);
  if (!accessToken) return null;

  const jwt = new JWT(req.env);

  let session: SessionJWTPayload | null = null;

  try {
    session = (await jwt.verifyAccess(accessToken)) as SessionJWTPayload;
    log("verifyAccess session", session.userId);
    return { userId: session.userId };
  } catch (error) {
    req.cookie.delete("access-token");
    console.error(error);
  }

  const refreshToken = req.cookie.get("refresh-token")?.value;
  log("refreshToken", refreshToken);
  if (!refreshToken) return null;

  try {
    session = (await jwt.verifyRefresh(refreshToken)) as SessionJWTPayload;
    log("verifyRefresh session", session.userId);

    const sessionIdentity = req.cookie.get("session-token")?.value || "";
    if (session.sessionIdentity !== sessionIdentity)
      throw new Error("refresh session sessionIdentity not match");

    const sessionId = `${session.userId}::${session.sessionIdentity}`;
    const dbSessions = new DBSessions(req.env);
    const sessionStore = await dbSessions.load(sessionId);

    if (sessionStore.noise !== session.noise)
      throw new Error("refresh session noise not match");

    const sessionAgent = await catchSessionAgent(req);
    if (sessionStore.country !== sessionAgent.country)
      throw new Error("User agent changed");

    const noise = genNoise();
    // await dbSessions.update(sessionId, session.noise, {
    //   ...sessionAgent,
    //   expires: new Date(Date.now() + SESSION_REFRESH_EXPIRED),
    // });

    await renewSession(req, session.userId, session.sessionIdentity, noise);

    return { userId: session.userId };
  } catch (error) {
    req.cookie.delete("refresh-token");
    console.error(error);
  }

  return null;
};

export const useAuthSession = routeLoader$((req) => {
  return req.sharedMap.get("session") as Session | null;
});

export const onRequest: RequestHandler = async (req) => {
  if (isServer) {
    const log = debug.extend("onRequest");
    const session = await handleSession(req);
    log("session", req.url.pathname, session);
    req.sharedMap.set("session", session);
  }
};

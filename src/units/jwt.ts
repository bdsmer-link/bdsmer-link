import type { RequestEvent } from "@builder.io/qwik-city";
import {
  type JWTPayload,
  type KeyLike,
  SignJWT,
  jwtVerify,
  importSPKI,
  importPKCS8,
  createRemoteJWKSet,
} from "jose";

// const pair = crypto.generateKeyPairSync('ed25519');
// btoa(pair.privateKey.export({ format:'pem', type:'pkcs8' }))
// btoa(pair.publicKey.export({ format:'pem', type:'spki' }))

export interface IdToken {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  locale: string;
}

export default class JWT {
  privateKey: Promise<KeyLike>;
  publicKey: Promise<KeyLike>;

  constructor(env: RequestEvent["env"]) {
    this.privateKey = importPKCS8(
      atob(env.get("JWT_PKCS8_KEY") || ""),
      "EdDSA",
    );
    this.publicKey = importSPKI(atob(env.get("JWT_SPKI_KEY") || ""), "EdDSA");
  }

  async signRefresh(payload: JWTPayload): Promise<string> {
    const key = await this.privateKey;
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "EdDSA" })
      .setIssuer("bdsmer-link")
      .setSubject("refresh-token")
      .setExpirationTime("14d")
      .sign(key);
    return jwt;
  }

  async signAccess(payload: JWTPayload): Promise<string> {
    const key = await this.privateKey;
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "EdDSA" })
      .setIssuer("bdsmer-link")
      .setSubject("access-token")
      .setExpirationTime("1h")
      .sign(key);
    return jwt;
  }

  async verifyRefresh(token: string): Promise<JWTPayload> {
    try {
      const key = await this.publicKey;
      const { payload } = await jwtVerify(token, key, {
        issuer: "bdsmer-link",
        subject: "refresh-token",
      });
      return payload;
    } catch (error) {
      console.error(error);
      throw new Error("refresh token is invalid");
    }
  }

  async verifyAccess(token: string): Promise<JWTPayload> {
    try {
      const key = await this.publicKey;
      const { payload } = await jwtVerify(token, key, {
        issuer: "bdsmer-link",
        subject: "access-token",
      });
      return payload;
    } catch (error) {
      console.error(error);
      throw new Error("access token is invalid");
    }
  }
}

export async function signGoogleSheetToken(
  privateKey: string,
  email: string,
): Promise<string> {
  const tokenUri = "https://oauth2.googleapis.com/token";
  const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";

  const key = await importPKCS8(privateKey, "RS256");

  const jwt = await new SignJWT({
    scope: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/calendar.events.readonly",
    ].join(" "),
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(email)
    .setSubject(email)
    .setAudience(tokenUri)
    .setIssuedAt(new Date())
    .setExpirationTime("1m")
    .sign(key);

  const res = await fetch(tokenUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=${grantType}&assertion=${jwt}`,
  });
  const body = await res.json();

  return body.access_token;
}

export async function verifyIdToken(
  clientId: string,
  idToken: string,
): Promise<IdToken> {
  try {
    const JWKS = createRemoteJWKSet(
      new URL("https://www.googleapis.com/oauth2/v3/certs"),
    );

    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: "https://accounts.google.com",
      audience: clientId,
    });

    return payload as unknown as IdToken;
  } catch (error) {
    throw new Error("id token is invalid");
  }
}

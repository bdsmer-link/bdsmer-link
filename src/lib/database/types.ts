// User Link Types
export enum UserLinkType {
  text = "text",
  picture = "picture",
  hr = "hr",
  album = "album",
  social = "social",
  message = "message",
}

export type UserLinkText = {
  type: UserLinkType.text;
  title: string;
  url: string;
};

export type UserLinkPicture = {
  type: UserLinkType.picture;
  title: string | null;
  url: string | null;
  picture: string;
  width: number;
  height: number;
};

export type UserLinkHr = {
  type: UserLinkType.hr;
  title: string | null;
};

export type UserLinkAlbumPicture = {
  picture: string;
  width: number;
  height: number;
};

export type UserLinkAlbum = {
  type: UserLinkType.album;
  title: string | null;
  pictures: UserLinkAlbumPicture[];
};

export type UserLinkSocial = {
  type: UserLinkType.social;
  facebook: string | null;
  instagram: string | null;
  threads: string | null;
  twitter: string | null;
  snapchat: string | null;
  tiktok: string | null;
  mastodon: string | null;
  youtube: string | null;
};

export type UserLinkMessage = {
  type: UserLinkType.message;
  line: string | null;
  whatsapp: string | null;
  discord: string | null;
  telegram: string | null;
  signal: string | null;
  skype: string | null;
};

export type UserLink =
  | UserLinkText
  | UserLinkPicture
  | UserLinkHr
  | UserLinkAlbum
  | UserLinkSocial
  | UserLinkMessage;

// Theme
export enum Theme {
  default = "default",
  sunlight = "sunlight",
  cyberpunk = "cyberpunk",
  sexy = "sexy",
}

// Colors
export type CommunityColors = {
  primary: string;
  secondary: string;
  border: string;
  background: string;
  darkPrimary: string;
  darkSecondary: string;
  darkBorder: string;
  darkBackground: string;
};

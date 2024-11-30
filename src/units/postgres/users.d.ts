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

export enum Theme {
  default = "default",
  sunlight = "sunlight",
  cyberpunk = "cyberpunk",
  sexy = "sexy",
}

export enum UserPlan {
  pro = "pro",
  proPlus = "pro-plus",
  space = "space",
}

export enum UserRegion {
  twNorthern = "tw-northern",
  twMidlands = "tw-midlands",
  twSouthern = "tw-southern",
}

export type User = {
  id: number;
  uid: string | null;
  nickname: string;
  introduction: string | null;
  email: string;
  avatar: string;
  banner: string | null;
  background: string | null;
  links: UserLink[];
  theme: Theme;
  colors: {
    primary: string;
    secondary: string;
    border: string;
    background: string;
    darkPrimary: string;
    darkSecondary: string;
    darkBorder: string;
    darkBackground: string;
  };
  plan: UserPlan | null;
  region: UserRegion;
  location: string | null;
  lab: boolean;
};

export type Space = {
  id: number;
  uid: string | null;
  website: string | null;
  nickname: string;
  avatar: string;
  location: string | null;
  lastUpdatedAt: string | null;
  lastCheckedError: boolean;
  eventCount: number;
};

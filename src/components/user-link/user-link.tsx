import { component$ } from "@builder.io/qwik";
import { UserLinkType, type UserLink } from "~/lib/database";
import UserLinkText, { type UserLinkTextProps } from "./user-link-text";
import UserLinkPicture, {
  type UserLinkPictureProps,
} from "./user-link-picture";
import UserLinkHr, { type UserLinkHrProps } from "./user-link-hr";
import UserLinkAlbum, { type UserLinkAlbumProps } from "./user-link-album";
import UserLinkSocial, { type UserLinkSocialProps } from "./user-link-social";
import UserLinkMessage, {
  type UserLinkMessageProps,
} from "./user-link-message";

export interface UserLinkProps {
  uid: string | null;
  type: UserLinkType;
  item: UserLink;
}

export default component$<UserLinkProps>((props) => {
  switch (props.type) {
    case UserLinkType.text:
      return (
        <UserLinkText
          uid={props.uid}
          item={props.item as UserLinkTextProps["item"]}
        />
      );
    case UserLinkType.picture:
      return (
        <UserLinkPicture
          uid={props.uid}
          item={props.item as UserLinkPictureProps["item"]}
        />
      );
    case UserLinkType.hr:
      return <UserLinkHr item={props.item as UserLinkHrProps["item"]} />;
    case UserLinkType.album:
      return <UserLinkAlbum item={props.item as UserLinkAlbumProps["item"]} />;
    case UserLinkType.social:
      return (
        <UserLinkSocial
          uid={props.uid}
          item={props.item as UserLinkSocialProps["item"]}
        />
      );
    case UserLinkType.message:
      return (
        <UserLinkMessage
          uid={props.uid}
          item={props.item as UserLinkMessageProps["item"]}
        />
      );
  }
});

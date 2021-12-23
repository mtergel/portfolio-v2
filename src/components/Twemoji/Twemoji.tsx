import React, { memo } from "react";
import twemoji from "twemoji";

interface TwemojiProps {
  emoji: string;
  size?: string | number;
}
const Twemoji: React.FC<TwemojiProps> = ({ emoji, size }) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(emoji, {
          folder: "svg",
          ext: ".svg",
        }),
      }}
    />
  );
};

export default memo(Twemoji);

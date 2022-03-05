import React from 'react';
import avatarStyle from './Avatar.module.scss'

type AvatarProps = {
    src?: string,
    alt?: string,
    letter?: string
}

const Avatar: React.FC<AvatarProps> = ({src, alt, letter}) => {
    if (src) {
        return <img className={avatarStyle.avatar} src={src} alt = {alt}/>;
     }
      return <div className={avatarStyle.avatar}>{letter?.toUpperCase()}</div>;
}

export default React.memo(Avatar)
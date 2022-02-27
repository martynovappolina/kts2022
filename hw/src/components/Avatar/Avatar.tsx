import React from 'react';
import AvatarStyle from './Avatar.module.scss'

type AvatarProps = {
    src?: string,
    alt?: string,
    letter?: string
}

const Avatar: React.FC<AvatarProps> = ({src, alt, letter}) => {
    if (src) {
        return <img className={AvatarStyle.Avatar} src={src} alt = {alt}/>;
     }
      return <div className={AvatarStyle.Avatar}>{letter?.toUpperCase()}</div>;
}

export default React.memo(Avatar)
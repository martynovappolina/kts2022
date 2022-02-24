import React from 'react'
import './Avatar.css'

type AvatarProps = {
    src?: string,
    alt?: string,
    letter?: string
}

const Avatar: React.FC<AvatarProps> = ({src, alt, letter}) => {
    if (src) {
        return <img className="Avatar" src={src} alt = {alt}/>;
     }
      return <div className="Avatar">{letter?.toUpperCase()}</div>;
}

export default React.memo(Avatar)
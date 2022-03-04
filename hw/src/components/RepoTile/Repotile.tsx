import RepotileStyle from './Repotile.module.scss';

import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { RepoItemModel } from 'src/store/models/gitHub';


type RepoTileProps = {
    onClick: (name: string) => void;
    RepoItem: RepoItemModel;
};

const Repotile: React.FC<RepoTileProps> = ({ onClick, RepoItem }) => {
    const oonClick = (e: React.MouseEvent) => {
        onClick(RepoItem.name);
    };
    return (
        <div className={RepotileStyle.repotile} onClick={oonClick}>
            <Avatar src={RepoItem.owner.avatarUrl} letter={RepoItem.owner.login[0]} />
            <div className={RepotileStyle.repotile__Content}>
                <div className={RepotileStyle.repotile__RepoName}>{RepoItem.name}</div>
                <div className={RepotileStyle.repotile__OrgName}>{RepoItem.owner.login}</div>
                <div className={RepotileStyle.repotile__Info}>
                    <div className={RepotileStyle.repotile__StarFrame}>
                        <StarIcon />
                        {RepoItem.stargazersCount}
                    </div>
                    Updated { RepoItem.createdAt }
                </div>
            </div>
        </div>
    );
};

export default React.memo(Repotile);

import RepotileStyle from './Repotile.module.scss';

import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { RepoItem } from 'src/store/GitHubStore/types';

type RepoTileProps = {
    onClick: (name: string) => void;
    RepoItem: RepoItem;
};

const Repotile: React.FC<RepoTileProps> = ({ onClick, RepoItem }) => {
    const oonClick = (e: React.MouseEvent) => {
        onClick(RepoItem.name);
    };
    return (
        <div className={RepotileStyle.repotile} onClick={oonClick}>
            <Avatar src={RepoItem.owner.avatar_url} letter={RepoItem.owner.login[0]} />
            <div className={RepotileStyle.repotile__Content}>
                <div className={RepotileStyle.repotile__RepoName}>{RepoItem.name}</div>
                <div className={RepotileStyle.repotile__OrgName}>{RepoItem.owner.login}</div>
                <div className={RepotileStyle.repotile__Info}>
                    <div className={RepotileStyle.repotile__StarFrame}>
                        <StarIcon />
                        {RepoItem.stargazers_count}
                    </div>
                    Updated {RepoItem.created_at}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Repotile);

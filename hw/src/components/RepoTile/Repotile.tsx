import './Repotile.scss';

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
        <div className="repo-tile" onClick={oonClick}>
            <Avatar src={RepoItem.owner.avatar_url} letter={RepoItem.owner.login[0]} />
            <div className="repo-tile__Content">
                <div className="repo-tile__RepoName">{RepoItem.name}</div>
                <div className="repo-tile__OrgName">{RepoItem.owner.login}</div>
                <div className="repo-tile__Info">
                    <div className="repo-tile__StarFrame">
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

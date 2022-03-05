import repotileStyle from './Repotile.module.scss';

import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { RepoItemModel } from 'src/store/models/gitHub';


type RepoTileProps = {
    RepoItem: RepoItemModel;
};

const Repotile: React.FC<RepoTileProps> = ({ RepoItem }) => {
    return (
        <div className={repotileStyle.repotile}>
            <Avatar src={RepoItem.owner.avatarUrl} letter={RepoItem.owner.login[0]} />
            <div className={repotileStyle.repotile__Content}>
                <div className={repotileStyle.repotile__RepoName}>{RepoItem.name}</div>
                <div className={repotileStyle.repotile__OrgName}>{RepoItem.owner.login}</div>
                <div className={repotileStyle.repotile__Info}>
                    <div className={repotileStyle.repotile__StarFrame}>
                        <StarIcon />
                        {RepoItem.stargazersCount}
                    </div>
                    Created at { RepoItem.createdAt }
                </div>
            </div>
        </div>
    );
};

export default React.memo(Repotile);

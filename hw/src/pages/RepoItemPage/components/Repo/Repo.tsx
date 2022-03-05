import repoStyle from "./Repo.module.scss";
import repotileStyle from '@components/RepoTile/Repotile.module.scss';

import React from "react";
import { RepoItemModel } from "src/store/models/gitHub";
import StarIcon from '@components/StarIcon';
import Avatar from '@components/Avatar';
import { Link } from "react-router-dom";

type RepoProps = {
    RepoItem: RepoItemModel;
}

const Repo: React.FC<RepoProps> = ({RepoItem}) => {
    return (
        <div className={repoStyle.background}>
            <div className={repoStyle.repoitem}>
                <Avatar src={RepoItem.owner.avatarUrl} letter={RepoItem.owner.login[0]} />
                <div className={repoStyle.repoitem__repoName}>{RepoItem.name}</div>
                <div className={repotileStyle.repotile__Content}>
                    <div className={repoStyle.repoitem__text}>Владелец: {RepoItem.owner.login}</div>
                    <div className={repoStyle.repoitem__text}>Описание: {RepoItem.description}</div>
                    <div className={repoStyle.repoitem__text}>Язык: {RepoItem.language}</div>
                    <div className={repotileStyle.repotile__Info}>
                        <div className={repotileStyle.repotile__StarFrame}>
                            <StarIcon />
                            {RepoItem.stargazersCount}
                        </div>
                        Created at {RepoItem.createdAt}
                    </div>
                </div>
                <Link to={`/repos`}> 
                    <button className={repoStyle.repoitem__button}>Назад</button>
                </Link>
            </div>
        </div>
    )
};

export default React.memo(Repo)
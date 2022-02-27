import RepoStyle from "./Repo.module.scss";
import RepotileStyle from '@components/RepoTile/Repotile.module.scss';

import React from "react";
import { RepoItem } from "src/store/GitHubStore/types";
import StarIcon from '@components/StarIcon';
import Avatar from '@components/Avatar';
import { Link } from "react-router-dom";

type RepoProps = {
    RepoItem: RepoItem;
    setVisible: (e: boolean) => void
}

const Repo: React.FC<RepoProps> = ({RepoItem, setVisible}) => {
    return (
        <div className={RepoStyle.background}>
            <div className={RepoStyle.repoitem}>
                <Avatar src={RepoItem.owner.avatar_url} letter={RepoItem.owner.login[0]} />
                <div className={RepoStyle.repoitem__RepoName}>{RepoItem.name}</div>
                <div className={RepotileStyle.repotile__Content}>
                    <div className={RepoStyle.repoitem__text}>Владелец: {RepoItem.owner.login}</div>
                    <div className={RepoStyle.repoitem__text}>Описание: {RepoItem.description}</div>
                    <div className={RepoStyle.repoitem__text}>Язык: {RepoItem.language}</div>
                    <div className={RepotileStyle.repotile__Info}>
                        <div className={RepotileStyle.repotile__StarFrame}>
                            <StarIcon />
                            {RepoItem.stargazers_count}
                        </div>
                        Updated {RepoItem.created_at}
                    </div>
                </div>
                <Link to={`/repos`}> 
                    <button className={RepoStyle.repoitem__button} onClick={() => setVisible(false)}>Назад</button>
                </Link>
            </div>
        </div>
    )
};

export default React.memo(Repo)
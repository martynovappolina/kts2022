import "./Repo.scss"

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
        <div className="background">
            <div className='repo-item'>
                <Avatar src={RepoItem.owner.avatar_url} letter={RepoItem.owner.login[0]} />
                <div className="repo-item__RepoName">{RepoItem.name}</div>
                <div className="repo-tile__Content">
                    <div className="repo-item__text">Владелец: {RepoItem.owner.login}</div>
                    <div className="repo-item__text">Описание: {RepoItem.description}</div>
                    <div className="repo-item__text">Язык: {RepoItem.language}</div>
                    <div className="repo-tile__Info">
                        <div className="repo-tile__StarFrame">
                            <StarIcon />
                            {RepoItem.stargazers_count}
                        </div>
                        Updated {RepoItem.created_at}
                    </div>
                </div>
                <Link to={`/repos`}> 
                    <button className="repo-item__button" onClick={() => setVisible(false)}>Назад</button>
                </Link>
            </div>
        </div>
    )
};

export default React.memo(Repo)
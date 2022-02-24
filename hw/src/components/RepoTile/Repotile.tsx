import './Repotile.css'
import React from 'react'
import Avatar from '@components/Avatar'
import StarIcon from '@components/StarIcon'
import { RepoItem } from 'src/store/GitHubStore/types'

type RepoTileProps = {
    onClick: (id:number) => void;
    RepoItem: RepoItem
}

const Repotile: React.FC<RepoTileProps> = ({onClick, RepoItem}) => {
    const oonClick = (e: React.MouseEvent) => {
        onClick(RepoItem.id);
      }
    return (
            <div className="RepoTile" onClick={oonClick}>
                <Avatar src={RepoItem.owner.avatar_url} letter = {RepoItem.owner.login[0]}/>
                <div className="RepoTile__Content">
                    <div className="RepoTile__RepoName">{RepoItem.name}</div>
                    <div className="RepoTile__OrgName">{RepoItem.owner.login}</div>
                    <div className="RepoTile__Info">
                        <div className="RepoTile__StarFrame">
                            <StarIcon/>
                            {RepoItem.stargazers_count}
                        </div>
                        Updated {RepoItem.created_at}
                    </div>
                </div>
            </div> 
    )
}

export default React.memo(Repotile)
import './RepoTileDrawer.scss'

import React from "react";

import { useReposContext } from "@pages/ReposSearchPage/ReposSearchPage";

import Repotile from "@components/RepoTile/Repotile";

import { NavLink } from "react-router-dom";

type RepoTileDrawerProps = {
    onClick: (name: string) => void;
  }
  

const RepoTileDrawer: React.FC<RepoTileDrawerProps> = ({onClick}) => {
    const ReposContext = useReposContext();

    return (
    <div className="ReposList">
        {ReposContext.gitHubStore.list.map((repo) => {
            return (
                <NavLink  style={{ textDecoration: 'none', color: 'black' }} to={`/repos/${repo.name}`} key={repo.id}>
                    <Repotile key={repo.id} onClick={onClick} RepoItem={repo} />  
                </NavLink>         
            )
      })}
    </div>   
    );            
};

export default React.memo(RepoTileDrawer);

import repotileDrawerStyle from './RepoTileDrawer.module.scss'

import React from "react";

import { useReposContext } from "@pages/ReposSearchPage/ReposSearchPage";

import Repotile from "@components/RepoTile/Repotile";

import { NavLink } from "react-router-dom";

const RepoTileDrawer = () => {
    const reposContext = useReposContext();

    return (
    <div className={repotileDrawerStyle.reposList}>
        {reposContext.gitHubStore.list.map((repo) => {
            return (
                <NavLink  style={{ textDecoration: 'none', color: 'black' }} to={`/repos/${repo.name}`} key={repo.id}>
                    <Repotile RepoItem={repo} />  
                </NavLink>         
            )
      })}
    </div>   
    );            
};

export default React.memo(RepoTileDrawer);

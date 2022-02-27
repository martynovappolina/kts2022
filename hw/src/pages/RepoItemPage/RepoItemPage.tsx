import React, { useState, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useReposContext } from '@pages/ReposSearchPage/ReposSearchPage';

import { ApiResponse } from 'src/shared/store/ApiStore/types';
import { RepoItem } from 'src/store/GitHubStore/types';
import Repo from './components/Repo';
import GitHubStore from '../../store/GitHubStore';

type RepoItemPageProps = {
    visible: boolean;
    setVisible: (e: boolean) => void,
    isLoadingRepo: boolean;
  }

const RepoItemPage: React.FC<RepoItemPageProps> = ({visible, setVisible, isLoadingRepo}) => {
    const { name } = useParams<{ name: string}>();
    const [data, setData] = useState<RepoItem>();
    const [isLoading, load] = useState(isLoadingRepo);
    const gitHubStore = new GitHubStore();
    const ReposContext = useReposContext();
    
    const GetRepo = useCallback((orgname, reponame, visible, isLoading) => {
        const GetData = async () => {
            try {
                await gitHubStore
                    .getOrganizationRepo({ organizationName: orgname, name: reponame })
                    .then((result: ApiResponse<RepoItem, any>) => {
                        setData(result.data);
                    });
            } catch (e) {}
        };
        
        if(visible && isLoading) {
            GetData();
            load(false);
        }

    }, []);
    
    if(visible) GetRepo(ReposContext.data[0].owner.login, 'notific', visible, isLoading)
    console.log(name)
    if (visible && data) return <Repo RepoItem={data} setVisible={setVisible}/>;
    return null;
};

export default RepoItemPage;

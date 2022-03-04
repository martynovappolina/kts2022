import React, { useState, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useReposContext } from '@pages/ReposSearchPage/ReposSearchPage';

import { ApiResponse } from 'src/shared/store/ApiStore/types';
import { RepoItemModel } from 'src/store/models/gitHub';
import Repo from './components/Repo';
import GitHubStore from '../../store/ReposListStore';

type RepoItemPageProps = {
    visible: boolean;
    setVisible: (e: boolean) => void,
    isLoadingRepo: boolean;
  }

const RepoItemPage: React.FC<RepoItemPageProps> = ({visible, setVisible, isLoadingRepo}) => {
    const { name } = useParams<{ name: string}>();
    const [data, setData] = useState<RepoItemModel>();
    const [isLoading, load] = useState(isLoadingRepo);
    const gitHubStore = new GitHubStore();
    const ReposContext = useReposContext();
    
    const GetRepo = useCallback((orgname, reponame, isLoading) => {
        const GetData = async () => {
            try {
                await gitHubStore
                    .getOrganizationRepo({ organizationName: orgname, name: reponame })
                    .then((result: ApiResponse<RepoItemModel, any>) => {
                        setData(result.data);
                    });
            } catch (e) {}
        };

        if(isLoading) {
            GetData();
            load(false);
        }
    }, [visible]);

    if (visible) GetRepo(ReposContext.gitHubStore.list[0].owner.login, 'notific', isLoading)
    
    if (visible && data) return <Repo RepoItem={data} setVisible={setVisible}/>;
    return null;

    //у меня не получается использовать name нормально, я не понимаю почему, GetRepo вызывается только тогда, когда name undefined
    //я добавляла условие name!==undefined, тогда GetRepo вообще никогда не вызывается
};

export default RepoItemPage;

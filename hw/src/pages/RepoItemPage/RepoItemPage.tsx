import { useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Repo from './components/Repo';
import RepoItemStore from '@store/RepoItemStore';
import { observer } from 'mobx-react-lite';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';

const RepoItemPage = () => {
    const { name } = useParams<{ name: string}>();
    const RepoStore = useLocalStore (() => new RepoItemStore());

    const getRepo = useCallback((orgname) => {
        const getData = async () => {
            if(name !== undefined) {
                try {
                    await RepoStore
                    .getOrganizationRepo({ 
                        organizationName: orgname, 
                        name: name, 
                    })
                } catch (e) {}
            }
        };
        getData();
    }, [name]);

    useEffect (() => getRepo('ktsstudio'), []);
    
    if (RepoStore.item) return <Repo RepoItem={RepoStore.item} />;
    return null;
};

export default observer(RepoItemPage);

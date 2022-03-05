import React, { useCallback, useEffect, useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import SearchIcon from '@components/SearchIcon';
import RepoTileDrawer from '@components/RepoTileDrawer';
import Loading from '@components/Loading';
import Error from '@components/Error';

import ReposListStore from '@store/ReposListStore';

import style from './ReposSearchPage.module.scss';

import { observer } from 'mobx-react-lite';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';
import { Meta } from '@utils/meta';

const ReposContext = React.createContext({
    gitHubStore: {} as ReposListStore,
});
const Provider = ReposContext.Provider;
export const useReposContext = () => React.useContext(ReposContext);

const ReposSearchPage = () => {
    const [value, setValue] = useState('');

    const gitHubStore = useLocalStore (() => new ReposListStore());

    const handleInput = useCallback((e) => setValue(e.target.value), []);

    const handleClick = useCallback((value) => {   
        const getData = async () => {
            try {
              await gitHubStore.getOrganizationReposList({
                organizationName: value
              })
            } catch (err) {}
          };
        getData();         
    }, [value, gitHubStore]);
    
    useEffect(():any => handleClick('ktsstudio'), []) 

    return (
        <Provider value={{ gitHubStore }}>          
            <div className={style.main}>
                <div className={style.searchBar}>
                    <Input value={value} placeholder="Введите название организации" onChange={handleInput} />
                    <Button onClick={handleClick} children={<SearchIcon />} disabled={gitHubStore.meta} value={value} />
                </div>
                {gitHubStore.meta === Meta.error && <Error />}
                {gitHubStore.meta === Meta.loading && <Loading />}
                {gitHubStore.meta !== (Meta.loading || Meta.error) && <RepoTileDrawer />}
            </div>
        </Provider>
    );
};

export default observer(ReposSearchPage);

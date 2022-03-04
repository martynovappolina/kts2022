import React, { useCallback, useEffect, useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import SearchIcon from '@components/SearchIcon';
import RepoTileDrawer from '@components/RepoTileDrawer';
import RepoItemPage from '@pages/RepoItemPage';

import ReposListStore from '../../store/ReposListStore';

import './ReposSearchPage.css';

import { observer } from 'mobx-react-lite';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';

const ReposContext = React.createContext({
    gitHubStore: {} as ReposListStore,
});
const Provider = ReposContext.Provider;
export const useReposContext = () => React.useContext(ReposContext);

const ReposSearchPage = () => {
    const [value, setValue] = useState('ktsstudio');

    const [visible, setVisible] = useState(false);

    const gitHubStore = useLocalStore (() => new ReposListStore());

    const handleInput = useCallback((e) => setValue(e.target.value), []);

    const handleClick = useCallback(() => {   
        const getData = async () => {
            try {
              await gitHubStore.getOrganizationReposList({
                organizationName: value
              })
            } catch (err) {}
          };
        getData();         
    }, [value, gitHubStore]);

    const RepoItemDrawer = useCallback((name: string) => setVisible(true), [])
    
    useEffect(():any => handleClick(), []) 

    return (
        <Provider value={{ gitHubStore }}>          
            <div className="main">
                <div className="SearchBar">
                    <Input value={value} placeholder="Введите название организации" onChange={handleInput} />
                    <Button onClick={handleClick} children={<SearchIcon />} disabled={gitHubStore.meta} />
                </div>
                <RepoTileDrawer onClick={RepoItemDrawer} />
            </div>
            <RepoItemPage visible={visible} setVisible={setVisible} isLoadingRepo={true} />
        </Provider>
    );
};

export default observer(ReposSearchPage);

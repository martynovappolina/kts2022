import React, { useCallback, useEffect, useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import SearchIcon from '@components/SearchIcon';
import RepoTileDrawer from '@components/RepoTileDrawer';
import RepoItemPage from '@pages/RepoItemPage';
import { ApiResponse } from 'src/shared/store/ApiStore/types';
import { RepoItem } from 'src/store/GitHubStore/types';

import GitHubStore from '../../store/GitHubStore';

import './ReposSearchPage.css';

const ReposContext = React.createContext({
    data: [] as RepoItem[],
    isLoading: false,
    load: (e: boolean) => {},
});
const Provider = ReposContext.Provider;
export const useReposContext = () => React.useContext(ReposContext);

const ReposSearchPage = () => {
    const [value, setValue] = useState('ktsstudio');

    const [isLoading, load] = useState(false);

    const [visible, setVisible] = useState(false);

    const [data, setData] = useState<RepoItem[]>([]);

    const gitHubStore = new GitHubStore();

    const handleInput = useCallback((e) => setValue(e.target.value), []);

    const handleClick = useCallback(() => {
        const GetData = async () => {
            try {
                load(true);
                await gitHubStore
                    .getOrganizationReposList({ organizationName: value })
                    .then((result: ApiResponse<RepoItem[], any>) => {
                        setData(result.data);
                        load(false);
                    });
            } catch (e) {}
        };
        
        GetData();
    }, []);

    const  RepoItemDrawer = useCallback((name: string) => setVisible(true), [])

    useEffect(() => handleClick(), []);
    
    return (
        <Provider value={{ data, isLoading, load }}>
            
            <div className="main">
                <div className="SearchBar">
                    <Input value={value} placeholder="Введите название организации" onChange={handleInput} />
                    <Button onClick={handleClick} children={<SearchIcon />} disabled={isLoading} />
                </div>
                <RepoTileDrawer onClick={RepoItemDrawer} />
            </div>
            <RepoItemPage visible={visible} setVisible={setVisible} isLoadingRepo={true} />
        </Provider>
    );
};

export default ReposSearchPage;

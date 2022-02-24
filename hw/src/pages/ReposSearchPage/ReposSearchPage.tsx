import SearchIcon from '@components/SearchIcon'
import Button from '@components/Button'
import RepoTile from '@components/RepoTile'
import Input from '@components/Input'
import GitHubStore from '../../store/GitHubStore'
import { ApiResponse } from 'src/shared/store/ApiStore/types'
import { RepoItem } from 'src/store/GitHubStore/types'

import './ReposSearchPage.css'
import { useCallback, useEffect, useState } from 'react'

const ReposSearchPage = () => {
    const [value, setValue] = useState('ktsstudio');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([{
        id: 123,    
        name: 'kts-frontend-winter-school',
        owner: {
            login: 'ktsstudio',
            avatar_url: ''
        },
        created_at: '21 Jul',
        stargazers_count: 123,
    }]); 
    const gitHubStore = new GitHubStore();

    const handleInput = useCallback((e) => setValue(e.target.value), [])

    const handleClick = useCallback(() => {
        const GetData = async () => {
            try {
                await gitHubStore.getOrganizationReposList({
                  organizationName: value
                }).then((result: ApiResponse<RepoItem[], any>) => {
                    setData(result.data)
                    setIsLoading(false)
                  })
            } catch (e) {}
        };

        setIsLoading(true)
        GetData();
    },[value, data]);

    
    useEffect(() => handleClick(), [])

    return (
        <>
            <div className="main">
            <div className="SearchBar">
                <Input value = {value} placeholder='Введите название организации' onChange={handleInput}/>
                <Button onClick={handleClick} 
                        children = {<SearchIcon/>} 
                        disabled = {isLoading}/> 
            </div>

            <div className="ReposList">
                {   
                    data.map(repo =>( 
                        <RepoTile 
                            key={repo.id}
                            onClick={() => console.log("RepoTile is clicked")} 
                            RepoItem={repo}/>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default ReposSearchPage
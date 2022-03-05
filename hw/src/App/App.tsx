import RepoItemPage from '@pages/RepoItemPage';
import ReposSearchPage from '@pages/ReposSearchPage';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/repos" component={ReposSearchPage} />
            <Route path="/repos/:name" component={RepoItemPage} />
            <Redirect to="/repos" />
        </BrowserRouter>
    );
};

export default App;

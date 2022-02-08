import ApiStore from '../../shared/store/ApiStore';
import { IGitHubStore, RepoItem, GetOrganizationReposListParams } from "./types";
import { RequestParams, HTTPMethod, ApiResponse} from '../../shared/store/ApiStore/types';

const BASE_URL = 'https://api.github.com/'

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore(BASE_URL); 

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>> {
        let request: RequestParams<object> = {
            method: HTTPMethod.GET,
            endpoint: `orgs/${params.organizationName}/repos`,
            headers: {
                accept: "application/vnd.github.v3+json"
            },
            data: {
                }
        }

        return await this.apiStore.request<RepoItem[]>(request)
    }

    async postOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>> {
        let request: RequestParams<object> = {
            method: HTTPMethod.POST,
            endpoint: `orgs/${params.organizationName}/repos`,
            headers: {
                accept: "application/vnd.github.v3+json"
            },
            data: {
                organizationName: params.organizationName,
                }
        }

        return await this.apiStore.request<RepoItem[]>(request)
    }
}

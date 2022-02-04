import ApiStore from '../../shared/store/ApiStore';
import { IGitHubStore, ApiResp, RepoItem, GetOrganizationReposListParams } from "./types";
import { RequestParams, HTTPMethod } from '../../shared/store/ApiStore/types';

export default class GitHubStore implements IGitHubStore {
    baseUrl: string = "https://api.github.com/";
    private readonly apiStore = new ApiStore(this.baseUrl); 

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories

        let request: RequestParams<object> = {
            method: HTTPMethod.GET,
            endpoint: `orgs/${params.organizationName}/repos`,
            headers: {
                accept: "application/vnd.github.v3+json"
            },
            data: {
                organizationName: params.organizationName
                }
        }

        let result = await this.apiStore.request<RepoItem[]>(request)

        return {
            success: result.success,
            repos: result.data
        }
    }
}

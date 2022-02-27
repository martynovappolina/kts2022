import { ApiResponse } from "../../shared/store/ApiStore/types"

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type GetOrganizationRepoParams = {
    organizationName: string
    name: string;
}

export type RepoItem = {
    id: number;
    name: string,
    owner: {
        login: string,
        avatar_url: string
    }
    created_at: string
    stargazers_count: number
    language: string
    description: string
}

export interface IGitHubStore {

    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
    postOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}

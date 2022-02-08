import { ApiResponse } from "../../shared/store/ApiStore/types"

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type RepoItem = {
    id: number,
    name: string,
    description: string,
    owner: {
        name: string,
        avatar_url?: string,
        type: string
        site_admin: string
    }
}

export interface IGitHubStore {

    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
    postOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}

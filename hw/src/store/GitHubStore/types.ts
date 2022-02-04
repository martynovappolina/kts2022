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

export type ApiResp<repos> = {
    success: boolean,
    repos: repos
}

export interface IGitHubStore {
    baseUrl: string;

    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>>;
}

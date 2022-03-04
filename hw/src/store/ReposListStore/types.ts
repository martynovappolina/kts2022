import { ApiResponse } from "../../shared/store/ApiStore/types"

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type GetOrganizationRepoParams = {
    organizationName: string
    name: string;
}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void>;
}

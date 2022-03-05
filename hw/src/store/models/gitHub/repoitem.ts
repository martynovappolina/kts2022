import dayjs from "dayjs";
import { GitHubRepoOwnerApi, GitHubRepoOwnerModel, normalizeGitHubRepoOwner } from "./gitHubRepoOwner";

export type RepoItemApi = {
    id: number;
    name: string;
    owner: GitHubRepoOwnerApi;
    created_at: string;
    stargazers_count: number;
    language: string;
    description: string;
}

export type RepoItemModel = {
    id: number;
    name: string;
    owner: GitHubRepoOwnerModel;
    createdAt: string;
    stargazersCount: number;
    language: string;
    description: string;
}

export const normalizeRepoItem = (
    from: RepoItemApi
): RepoItemModel => ({
    id: from.id,
    name: from.name,
    stargazersCount: from.stargazers_count,
    language: from.language,
    description: from.description,
    createdAt: dayjs(from.created_at).format("DD MMM"),
    owner: normalizeGitHubRepoOwner(from.owner),
});

export const getInitialGitHubRepoOwnerModel = (): GitHubRepoOwnerModel => ({
    id: 0,
    url: '',
    avatarUrl: '',
    login: '',
})

export const getInitialRepoItemModel = (): RepoItemModel => ({
    id: 0,
    name: '',
    owner: getInitialGitHubRepoOwnerModel(),
    createdAt: '',
    stargazersCount: 0,
    language: '',
    description: '',
});
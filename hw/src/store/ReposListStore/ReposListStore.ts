import ApiStore from '../../shared/store/ApiStore';
import { IGitHubStore, GetOrganizationReposListParams, GetOrganizationRepoParams } from "./types";
import { HTTPMethod } from '../../shared/store/ApiStore/types';
import { ILocalStore } from '@utils/useLocalStore/useLocalStore';
import { Meta } from '@utils/meta';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { normalizeRepoItem, RepoItemApi, RepoItemModel } from '../models/gitHub';
import { CollectionModel, getInitialCollectionModel, linearizeCollection, normalizeCollection } from '../models/shared/collection';

const BASE_URL = 'https://api.github.com/'

type PrivateFields = "_list" | "_meta"

export default class ReposListStore implements IGitHubStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL); 

    private _list: CollectionModel<number, RepoItemModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ReposListStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            getOrganizationReposList: action
        })
    }

    get list(): RepoItemModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void> {
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        const response = await this._apiStore.request<RepoItemApi[]>( {
            method: HTTPMethod.GET,
            endpoint: `orgs/${params.organizationName}/repos`,
            headers: {
                accept: "application/vnd.github.v3+json"
            },
            data: {}
        }); 
        
        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
            }

            try {
                const list: RepoItemModel[] = [];
                for (const item of response.data) {
                    list.push(normalizeRepoItem(item));
                }
                this._meta = Meta.success;
                this._list = normalizeCollection(list, (listItem) => listItem.id);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
            }

        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._list = getInitialCollectionModel();
    }
}

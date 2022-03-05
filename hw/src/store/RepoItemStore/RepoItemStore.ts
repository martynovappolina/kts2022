import ApiStore from '../../shared/store/ApiStore';
import { GetOrganizationRepoParams } from '../ReposListStore/types';
import {  HTTPMethod } from '../../shared/store/ApiStore/types';
import { ILocalStore } from '@utils/useLocalStore/useLocalStore';
import { Meta } from '@utils/meta';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getInitialRepoItemModel, normalizeRepoItem, RepoItemApi, RepoItemModel } from '../models/gitHub';

const BASE_URL = 'https://api.github.com/'

type PrivateFields = "_item" | "_meta"

export default class RepoItemStore implements ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL); 

    private _item: RepoItemModel = getInitialRepoItemModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<RepoItemStore, PrivateFields>(this, {
            _item: observable.ref,
            _meta: observable,
            item: computed,
            meta: computed,
            getOrganizationRepo: action
        })
    }

    get item(): RepoItemModel {
        return this._item;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getOrganizationRepo(params: GetOrganizationRepoParams): Promise<void> {
        this._meta = Meta.loading;
        this._item = getInitialRepoItemModel();

        const response = await this._apiStore.request<RepoItemApi[]>( {
            method: HTTPMethod.GET,
            endpoint: `repos/${params.organizationName}/${params.name}`,
            headers: {
                accept: "application/vnd.github.v3+json"
            },
            data: {}
        }); 

        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
                console.log('error')
            }

            try {
                const item: RepoItemModel = normalizeRepoItem(response.data);
                this._item = item;
                this._meta = Meta.success;
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._item = getInitialRepoItemModel();
            }
        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._item = getInitialRepoItemModel();
    }
}
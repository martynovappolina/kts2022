import {ApiResponse, IApiStore, RequestParams, HTTPMethod, StatusHTTP} from "./types";
import qs from 'qs'

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl:string) {
        this.baseUrl = baseUrl
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let url = `${this.baseUrl}${params.endpoint}`;
        let body: any = null;
        const headers = {...params.headers};

        if (params.method === HTTPMethod.GET) {
            url = `${url}?${qs.stringify(params.data)}`
        }
        if (params.method === HTTPMethod.POST) {
            body =  JSON.stringify(params.data)
            headers ['Content-Type'] = 'application/json;charset=UTF-8'
        }

        try {
            let response: any = await fetch(url, {
                method: params.method,
                headers,
                body,
            })
            if (response.ok) 
                return {
                    success: true,
                    data: await response.json(),
                    status: response.status,
                };
            else 
                return {
                    success: false,
                    data: await response.json(),
                    status: response.status,
                };
        }catch(e) {
            return {
                success: false,
                data: e,
                status: StatusHTTP.UNEXPECTED_ERROR,
            };
        }

    }
}
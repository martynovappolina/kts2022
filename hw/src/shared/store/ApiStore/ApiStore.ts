import { findConfigFile } from "typescript";
import {ApiResponse, IApiStore, RequestParams, HTTPMethod} from "./types";

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl:string) {
        this.baseUrl = baseUrl
    }

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let qs = require('qs');
        let query = params.method === HTTPMethod.GET ? "?" + qs.stringify(params.data) : "";
        let url = this.baseUrl + params.endpoint + query;
        //console.log(url)

        async function GetRequest(url: string): Promise<ApiResponse<SuccessT, ErrorT>> {
            let response: any = await fetch(url)
            .then(function(response) {
                if (response.ok) 
                    return {
                        success: true,
                        data: response.json(),
                        status: response.status,
                    };
                else 
                    return {
                        success: false,
                        data: response.json(),
                        status: response.status,
                    };
            })

            return response
        }

        return GetRequest(url)
    }
}
import axios, { AxiosResponse } from 'axios'
import { Application, ApplicationDocument, CreateApplicationRequest } from '../types/application';
import { UnitResponse, Include, UnitError } from '../types/core';
import { BaseResource } from './baseResource';

export class Applications extends BaseResource{

    constructor(token: string, basePath: string) {
        super(token, basePath + '/applications');
    }

    public async list(params: ApplicationListParams): Promise<UnitResponse<Application[]> | UnitError> {
        var parameters = {
            'page[limit]': (params.limit ? params.limit : 100),
            'page[offset]': (params.offset ? params.offset : 0),
            ...(params.query && { 'filter[query]': params.query }),
            ...(params.email && { 'filter[email]': params.email }),
            ...(params.tags && { 'filter[tags]': params.tags }),
            'sort': params.sort ? params.sort : '-createdAt'
        }

        return this.httpGet<UnitResponse<Application[]>>('', { params: parameters })
    }

    public async create(request: CreateApplicationRequest): Promise<UnitResponse<Application> | UnitError> {
        var headers = {
            'Content-Type': 'application/vnd.api+json'
        };

        return this.httpPost<UnitResponse<Application>>('', { data: request }, { headers })
    }

    public async get(id: number): Promise<UnitResponse<Application> & Include<ApplicationDocument[]> | UnitError> {
        return this.httpGet<UnitResponse<Application> & Include<ApplicationDocument[]>>(`/${id}`)
    }

    public async listDocuments(id: number): Promise<UnitResponse<ApplicationDocument[]> | UnitError> {
        return this.httpGet<UnitResponse<ApplicationDocument[]>>(`/${id}/documents`)
    }

    // public async upload(applicationID: number, documentId: number, file: any) : Promise<UnitResponse<ApplicationDocument> | UnitError> {
        
        // var path = `${this.basePath + this.resourcePath}/${applicationID}/documents/${{documentId}}`

        // var data = new FormData()

        // var headers = {
        //     'Authorization': `Bearer ${this.token}`
        // };

        // var res = await axios.put<UnitResponse<ApplicationDocument> | UnitError>(path,{data:data}, { headers: headers })
        //     .then(r => r.data)
        //     .catch(error => { return error.response.data })

        // return res
    // }
}

interface ApplicationListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number,

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number,

    /**
     * Optional. Search term according to the Full-Text Search Rules.
     * default: empty
     */
    query?: string,

    /**
     * Optional. Filter applications by email address (case sensitive).
     * default: empty
     */
    email?: string,

    /**
     * Optional. Filter Applications by Tags.
     * default: empty
     */
    tags?: Object,

    /**
     * Optional. sort=createdAt for ascending order or sort=-createdAt (leading minus sign) for descending order.
     * default: sort=-createdAt	
     */
    sort?: string
}
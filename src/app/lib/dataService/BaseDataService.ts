import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServiceConfigInterface} from "./ServiceConfigInterface";
import {EnRequestContentTypes} from "../enum/EnRequestContentTypes";
import qs from 'qs';

// 请求的方式
const requestMethod = {
    get: 'get',
    post: 'post'
};

// @declare() window = any;

// 默认的basePath
const defaultProtocol = 'http://';
const defaultBasePath = '/appapi';
const defaultRequestHost = "m1.uat.yaok.com" || location.host;
// 键值
const contentTypeKey = 'Content-Type';

@Injectable()
export class BaseDataService {
    // 默认的请求类型
    static defaultContentType = EnRequestContentTypes.form;

    constructor(private http: HttpClient) {
    }

    request(config: ServiceConfigInterface, success: Function = null, failed: Function = null): void {
        if (!config.method) {
            config.method = requestMethod.post;
        }

        let url: string;
        url = this.getUrl(config.url, config.params, config.basePath);
        this.http.request(config.method, url, {
            headers: this.getHeader(config.contentType),
            body: this.getBody(config.data, config.contentType)
        }).subscribe(res => {
            this.controlData(res, success, failed);
        }, error2 => {
            this.controlError(error2.message, failed);
        });
    }

    controlData(res: any, success: Function = null, failed: Function = null): any {
        if (res.code === 0) {
            if (typeof success === 'function') {
                success(res.data);
            }
        } else {
            this.controlError(res.message, failed);
        }
    }

    controlError(message: string, failed: Function = null) {
        if (typeof failed === 'function') {
            failed(message);
        } else {
            console.log(message);
        }
    }

    getUrl(url, params: object = {}, bathPath = defaultBasePath): string {
        if (url.indexOf('http') !== 0) {
            url = defaultProtocol + defaultRequestHost + bathPath + url;
        }

        for (let key in params) {
            if (url.indexOf('?') === -1) {
                url += '?';
            } else {
                url += '&';
            }
            url += key + '=' + encodeURIComponent(params[key]);
        }
        return url;
    }

    getBody(data: object = {}, contentType: string = BaseDataService.defaultContentType): string {
        let p: any, key: string;

        switch (contentType) {
            case EnRequestContentTypes.form:
                p = "";
                p = qs.stringify(data);
                break;

            case EnRequestContentTypes.json:
                p = JSON.stringify(data);
                break;

            case EnRequestContentTypes.file:
                p = new FormData();
                for (key in data) {
                    p.append(key, data[key]);
                }
                break;
        }
        return p;
    }

    getHeader(contentType: string = BaseDataService.defaultContentType): HttpHeaders {
        //如果为file 不设置
        if (contentType == EnRequestContentTypes.file) {
            return null;
        } else {
            let headers = new HttpHeaders();
            headers = headers.set(contentTypeKey, contentType);
            return headers;
        }
    }
}

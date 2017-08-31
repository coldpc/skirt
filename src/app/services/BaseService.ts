import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// 请求的方式
const requestMethod = {
  get: 'get',
  post: 'post'
};

interface RequestConfig {
  contentType ?: string;
  url: string;
  method ?: string;
  params ?: object;
  basePath ?: string;
  data ?: object;
}

// 默认的basePath
const defaultProtocol = 'http://';
const defaultBasePath = '/appapi';
const defaultRequestHost = location.host;

// 请求的contentType
const requestContentType = {
  form: 'application/x-www-form-urlencoded',
  json: 'application/json',
  file: 'multipart/form-data'
};

// 键值
const contentTypeKey = 'Content-Type';
const defaultContentType = 'form';


@Injectable()
export class BaseService {
  constructor(private http: HttpClient) {
  }

  request(config: RequestConfig, success: Function = null, failed: Function = null): void {
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

  getBody(data: object = {}, contentType: string = defaultContentType): string {
    let p: any, key: string;
    contentType = requestContentType[contentType];
    if (contentType === requestContentType.form) {
      p = '';
      for (key in data) {
        if (p.length > 0) {
          p += '&';
        }
        p += key + '=' + data[key];
      }
    } else if (contentType === requestContentType.json) {
      p = JSON.stringify(data);
    } else if (contentType === requestContentType.file) {
      p = new FormData();
      for (key in data) {
        p.append(key, data[key]);
      }
    }
    return p;
  }

  getHeader(contentType: string = defaultContentType): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set(contentTypeKey, requestContentType[contentType]);
    return headers;
  }
}

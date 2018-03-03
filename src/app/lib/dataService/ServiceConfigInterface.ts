export interface ServiceConfigInterface {
    url: string;
    basePath ?: string;
    data ?: any;
    contentType ?: string;
    method ?: string;
    params ?: object;
    request ?: Function;
}

export interface BatchData{
    batchId?: string;
    categoryId?: string;
    batchName?: string;
    description?: string;
    requestMethod?: string;
    environtment?: string;
    mainUrl?: string;
    endpoint?: string;
    imgUrl?: string;
}

export interface mockResp{
    balikan?: boolean;
}

export interface DogData{
    balikan?: boolean;
    message?: string;
    status?: string;
}

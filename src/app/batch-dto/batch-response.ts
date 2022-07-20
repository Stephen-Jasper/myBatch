export interface BatchResponse{
    id?: string;
    req_method?: string;
    name?: string;
    mainUrl?: string;
    env?: string;
    img?: string;
}

export interface mockResp{
    balikan?: boolean;
}

export interface DogData{
    balikan?: boolean;
    message?: string;
    status?: string;
}

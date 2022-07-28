export interface BatchData{
    batchId?: string;
    categoryId?: string; // Fiture name
    batchName?: string;
    description?: string;
    requestMethod?: string;
    environment?: string;
    mainUrl?: string;
    endpoint?: string;
    imgUrl?: string;
}

export interface CategoryData{
    categoryId?: string;
    categoryName?: string;
}

export interface FeatureRequest{
    category_name?: string;
}

export interface BatchRequest{
    category_id?: string; // Fiture name
    batch_name?: string;
    description?: string;
    request_method?: string;
    environment?: string;
    main_url?: string;
    endpoint?: string;
    imgUrl?: string;
}

export interface DogData{
    balikan?: boolean;
    message?: string;
    status?: string;
}

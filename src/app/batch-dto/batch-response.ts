export interface BatchData{
    batch_id?: string;
    category_id?: string; // Fiture name
    batch_name?: string;
    description?: string;
    request_method?: string;
    environment?: string;
    main_url?: string;
    endpoint?: string;
}

export interface BatchGroupData{
    batches_per_categories: CategoryGroupedData[];
}

export interface CategoryGroupedData{
    category_id?: string;
    category_name?: string;
    list_batch: BatchData[];
}

export interface CategoryData{
    category_id?: string;
    category_name?: string;
    main_url_dev?: string;
    main_url_uat?: string;
}

export interface EnvData{
    env_id?: string;
    env_name?: string;
}

export interface FeatureRequest{
    category_name?: string;
    main_url_dev?: string;
    main_url_uat?: string;
}

export interface seachRequest{
    batch_name?: string;
    category_id?: string;
}

export interface BatchDataDetail{
    batch_id?: string;
    category_id?: string; // Fiture name
    batch_name?: string;
    description?: string;
    request_method?: string;
    environment?: string;
    main_url?: string;
    endpoint?: string;
}

export interface BatchRequest{
    category_id?: string; // Fiture name
    batch_name?: string;
    description?: string;
    request_method?: string;
    environment?: string;
    main_url?: string;
    endpoint?: string;
}

export interface BatchRestore{
    deleted_batch_id?: string;
    category_id?: string; // Fiture name
    batch_name?: string;
    description?: string;
    request_method?: string;
    environment?: string;
    main_url?: string;
    endpoint?: string;
}

export interface HistoryData{
    history_id?: string;
    environment?: string;
    category_name?: string;
    hit_date?: string;
    batch_name?: string;
    result?: string;
}

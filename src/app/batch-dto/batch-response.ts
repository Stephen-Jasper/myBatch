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

export interface CategoryData{
    categoryId?: string;
    categoryName?: string;
}

export interface FeatureRequest{
    category_name?: string;
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

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
    categoryName?: string;
}

export interface DogData{
    balikan?: boolean;
    message?: string;
    status?: string;
}

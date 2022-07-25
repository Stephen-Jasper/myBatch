export interface ServiceResponse<T> {
    error_schema: ErrorSchema;
    output_schema: T;
}

interface ErrorSchema {
    error_code: string;
    error_message: ErrorMessage;
}

interface ErrorMessage {
    indonesian: string;
    english: string;
}

export interface ServiceResponse<T> {
    error_schema: ErrorSchema;
    output_schema: T;
    result?: string;
}

interface ErrorSchema {
    error_code: string;
    error_message: string; // ErrorMessage
}

// interface ErrorMessage {
//     indonesian: string;
//     english: string;
// }

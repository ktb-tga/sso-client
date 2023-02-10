declare type CustomRequest = RequestInit & {
    timeout?: number;
};
export declare function fetchWithTimeout(resource: string, options: CustomRequest): Promise<Response>;
export {};

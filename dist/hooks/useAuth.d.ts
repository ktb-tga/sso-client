interface UseAuthType<T> {
    isAuthed: boolean;
    isAuthing: boolean;
    user: T | null;
}
export declare const useAuth: <T extends unknown>(allowedNetwork?: boolean, callback?: ((user: T) => void) | undefined) => UseAuthType<T>;
export {};

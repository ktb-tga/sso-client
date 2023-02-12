type SSOMode = 'production' | 'development';
type SSOProps = {
    apiURL: string;
    appURL?: string;
    authenticateEndpoint?: string;
    userInfoEndpoint?: string;
    preflightURL?: string;
    mode?: SSOMode;
    originSourceQuery?: string;
    redirectPath?: string;
    localStorageKey?: string;
};
declare class SSOClient {
    #private;
    get appURL(): string;
    get apiURL(): string;
    get authenticateEndpoint(): string;
    get userInfoEndpoint(): string;
    get preflightURL(): string;
    get ssoURL(): string;
    get mode(): SSOMode;
    get localStorageKey(): string;
    get originSourceQuery(): string;
    get redirectPath(): string;
    private setupOriginSource;
    private setupSSOModeAndURL;
    configure(props: SSOProps): void;
}
export declare const SSO: SSOClient;
export {};
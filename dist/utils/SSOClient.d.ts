type SSOMode = 'production' | 'development';
type SSOProps = {
    appURL: string;
    apiURL: string;
    authenticateEndpoint?: string;
    userInfoEndpoint?: string;
    preflightURL?: string;
    mode?: SSOMode;
    originSourceQuery?: string;
    redirectPath?: string;
    localStorageKey?: string;
};
declare class SSO {
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
    set redirectPath(path: string);
    private setupOriginSource;
    private setupSSOModeAndURL;
    configure(props: SSOProps): void;
}
export default SSO;

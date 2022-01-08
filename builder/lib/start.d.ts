export declare const getStartParam: (finalConfig: any) => Promise<{
    url: string;
    port: any;
    https: any;
    host: any;
}>;
export declare function startServer(config: any, appConfigPath?: string): {
    start(): Promise<void>;
};

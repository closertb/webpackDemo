import * as Config from '@gem-mine/webpack-chain';
export declare function moduleConfig({ config, env, ...others }: {
    config: any;
    env: 'production' | 'none' | 'development';
    [prop: string]: any;
}): Config;
export declare const buildEnvs: {
    ROOT_PATH: string;
    SRC_PATH: string;
    BUILD_PATH: string;
    BUILD_STATIC_PATH: string;
    CDN_BASE: string;
    ASSETS_URL: string;
    PUBLISH_ENV: string;
};
export { startServer, getStartParam } from './start';

import Config from '@gem-mine/webpack-chain';
export default function ({ webpackConfig, config, runtime, }: {
    webpackConfig: Config;
    config: any;
    isDev: boolean;
    runtime?: {
        heads?: string[] | string;
        bodies?: string[] | string;
    };
    [prop: string]: any;
}): Config;

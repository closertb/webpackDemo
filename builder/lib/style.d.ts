import Config from '@gem-mine/webpack-chain';
interface Opts {
    mfsu?: boolean;
    webpackConfig: Config;
    config: any;
    isDev: boolean;
    disableCompress?: boolean;
    browserslist?: any;
    miniCSSExtractPluginPath?: string;
    miniCSSExtractPluginLoaderPath?: string;
}
interface CreateCSSRuleOpts extends Opts {
    lang: string;
    test: RegExp;
    loader?: string;
    options?: object;
}
export declare function createCSSRule({ webpackConfig, config, lang, test, isDev, loader, options, browserslist, }: CreateCSSRuleOpts): void;
export default function ({ config, webpackConfig, isDev, disableCompress, browserslist, }: Opts): void;
export {};

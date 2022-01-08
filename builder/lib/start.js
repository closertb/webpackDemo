"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.getStartParam = void 0;
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const chokidar = require("chokidar");
const open = require("open");
const portfinder = require("portfinder");
const qs = require("qs");
exports.getStartParam = (finalConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const serverConfig = finalConfig.devServer;
    let { port } = serverConfig;
    if (!port) {
        port = yield portfinder.getPortPromise({
            port: 8000,
            stopPort: 9000,
        });
    }
    const { host, https, path, query } = serverConfig || {};
    const querystring = query ? qs.stringify(query) : '';
    let url = `//${host}:${port}`;
    // 设置通用的url；
    url = `http${https ? 's' : ''}:${url}`;
    if (path) {
        url += path.startsWith('/') ? `${path}` : `/${path}`;
    }
    if (querystring) {
        url += `?${querystring}`;
    }
    // 删除无用的键；
    if (path || query) {
        delete serverConfig.path;
        delete serverConfig.query;
    }
    return {
        url,
        port,
        https,
        host,
    };
});
function startServer(config, appConfigPath) {
    let startParam;
    const watch = (path) => {
        chokidar.watch(path).on('change', () => {
            process.send({ code: 'restart', payload: startParam.url });
        });
    };
    const _start = () => __awaiter(this, void 0, void 0, function* () {
        const compiler = webpack(config);
        startParam = yield exports.getStartParam(config);
        const server = new WebpackDevServer(config.devServer, compiler);
        // console.log('');
        // console.log(chalk.green('Startingg server'));
        yield server.start();
        if (!(process.env.REBUILD === 'rebuild' && process.env.LAST_URL === startParam.url)) {
            open(startParam.url);
        }
        // console.log(chalk.green(`Successfully started server on http${startParam.https ? 's' : ''}://localhost:${startParam.port}`));
    });
    return {
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                yield _start();
                appConfigPath && watch(appConfigPath);
            });
        },
    };
}
exports.startServer = startServer;

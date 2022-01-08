"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEnvs = exports.moduleConfig = void 0;
const Config = require("@gem-mine/webpack-chain");
const base_1 = require("./base");
const module_1 = require("./module");
const style_1 = require("./style");
const plugin_1 = require("./plugin");
const html_1 = require("./html");
const server_1 = require("./server");

function moduleConfig(_a) {
    var { config, env } = _a, others = __rest(_a, ["config", "env"]);
    const webpackConfig = new Config();
    const isDev = env !== 'production';
    // const isProd = env === 'production';
    webpackConfig.mode(env);
    base_1.default({ config, webpackConfig, isDev });
    module_1.default({ config, webpackConfig, isDev });
    style_1.default({ config, webpackConfig, isDev });
    plugin_1.default({ config, webpackConfig, isDev });
    html_1.default(Object.assign({ config, webpackConfig, isDev }, others));
    server_1.default({ config, webpackConfig, isDev });
    return webpackConfig;
}

exports.moduleConfig = moduleConfig;

var start_1 = require("./start");
Object.defineProperty(exports, "startServer", { enumerable: true, get: function () { return start_1.startServer; } });
Object.defineProperty(exports, "getStartParam", { enumerable: true, get: function () { return start_1.getStartParam; } });

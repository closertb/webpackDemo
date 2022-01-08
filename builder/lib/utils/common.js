"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable guard-for-in */
const prefixRE = /^UMI_APP_/;
const ENV_SHOULD_PASS = ['NODE_ENV', 'HMR', 'SOCKET_SERVER', 'ERROR_OVERLAY'];
function default_1(opts) {
    const env = {};
    Object.keys(process.env).forEach((key) => {
        if (prefixRE.test(key) || ENV_SHOULD_PASS.includes(key)) {
            env[key] = process.env[key];
        }
    });
    for (const key in env) {
        env[key] = JSON.stringify(env[key]);
    }
    const define = {};
    if (opts.define) {
        for (const key in opts.define) {
            define[key] = JSON.stringify(opts.define[key]);
        }
    }
    return Object.assign({ 'process.env': env }, define);
}
exports.default = default_1;

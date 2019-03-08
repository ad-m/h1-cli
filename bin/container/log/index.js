'use strict';
const Cli = require('lib/cli');
const fs = require('fs');

const options = {
    follow: {
        description: 'Output current messages in real time as they arrive',
        type: 'boolean',
    },
    'log-file': {
        description: 'Path of output .jsonl file (disables all format option; default: stdout)',
        type: path => fs.createWriteStream(path),
        defaultValue: process.stdout,
    },
};

module.exports = resource => Cli.createCommand('log', {
    description: `Logs of ${resource.title}`,
    dirname: __dirname,
    plugins: resource.plugins,
    options: Object.assign({}, options, resource.options),
    handler: async args => {
        if (args.follow) {
            console.log('Get WS url!');
            const resp = await args.helpers.api
                .head(`${resource.url(args)}/log`, {})
                .query({ws: 1})
                .redirects(0)
                .ok(res => res.status < 400);
            const ws = await args.helpers.api.getWS(resp.headers.location, '');
            return new Promise((resolve, reject) => {
                ws.on('message', msg => args['log-file'].write(msg));
                ws.on('close', resolve);
                ws.on('error', reject);
            });
        }
        return args.helpers.api.api('GET', `${resource.url(args)}/log`).buffer(false)
            .then(resp => resp.pipe(args['log-file']))
            .then(() => {
            });
    },
});

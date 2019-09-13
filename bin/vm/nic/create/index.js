'use strict';

const Cli = require('lib/cli');

module.exports = (resource) => {
    const options = {
        network: {
            description: 'ID or name of Network to connect',
            type: 'string',
            required: false,
        },
        type: {
            description: 'Type of Network Adapter',
            type: 'string',
            required: true,
        },
        ip: {
            description: 'IP address to assign',
            type: 'string',
        },
    };

    return Cli.createCommand('create', {
        description: `Create ${resource.title}`,
        plugins: resource.plugins,
        options: Object.assign({}, resource.options, options),
        genericOptions: ['tag'],
        dirname: __dirname,
        handler: async args => {
            const body = {
                type: args.type,
                tag: require('lib/tags').createTagObject(args.tag),
            };
            if (args.network) {
                body.network = args.network;
            }
            if (args.ip) {
                body.ip = args.ip;
            }
            const result = await args.helpers.api.post(resource.url(args), body);
            return args.helpers.sendOutput(args, result);
        },
    });
};


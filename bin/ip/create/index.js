'use strict';

const Cli = require('lib/cli');
const genericDefaults = require('bin/generic/defaults');

const options = {
    'ptr-record': {
        description: 'Value of PTR record',
        type: 'string',
    },
};

module.exports = resource => Cli.createCommand('create', {
    dirname: __dirname,
    genericOptions: ['tag'],
    description: `Create ${resource.title}`,
    plugins: genericDefaults.plugins,
    options: Object.assign({}, options, resource.options),
    handler: async args => {
        const body = {
            tag: require('lib/tags').createTagObject(args.tag),
        };

        if (args['ptr-record']) {
            body.ptrRecord = args['ptr-record'];
        }

        const result = await args.helpers.api
            .post('ip', body);

        return args.helpers.sendOutput(args, result);
    },
});

'use strict';

const Cli = require('lib/cli');
const fs = require('lib/fs');
const genericDefaults = require('bin/generic/defaults');

const options = {
    'userdata-file': {
        description: 'Read userdata from file',
        type: 'string',
        required: true,
    },
};

module.exports = (resource) => Cli.createCommand('userdata', {
    description: `Manage userdata for ${resource.title}`,
    dirname: __dirname,
    plugins: genericDefaults.plugins,
    options: Object.assign({}, resource.options, options),
    params: resource.params,
    handler: async args => {
        const content = await fs.getFileContent(args['userdata-file']);
        const result = await args.helpers.api.patch(`vm/${args[resource.name]}`, {
            userMetadata: content.toString('base64'),
        });

        return args.helpers.sendOutput(args, result);
    },
});

'use strict';

const Cli = require('lib/cli');

const options = {
    email: {
        description: 'User email (eg: user@example.org)',
        type: 'string',
        required: true,
    },
};

module.exports = resource => Cli.createCommand('revoke', {
    description: `Revoke ${resource.title}`,
    dirname: __dirname,
    plugins: resource.plugins,
    params: resource.params,
    context: resource.context,
    options: Object.assign({}, resource.options, options),
    handler: async args => {
        const result = await args.helpers.api
            .delete(`${resource.url(args)}/${args.email}`);

        return args.helpers.sendOutput(args, result);
    },
});

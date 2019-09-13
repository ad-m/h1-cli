'use strict';

const Cli = require('lib/cli');

const text = require('lib/text');

module.exports = resource => {

    const options = {
        [resource.name]: {
            description: `${text.toTitleCase(resource.title)} ID or name`,
            type: 'string',
            required: true,
        },
    };

    return Cli.createCommand('show', {
        description: `Show ${resource.title}`,
        dirname: __dirname,
        resource: resource,
        options: Object.assign({}, resource.options, options),
        handler: async args => {
            const result = await args.helpers.api
                .get(`${resource.url(args)}/${args[resource.name]}`);

            return args.helpers.sendOutput(args, result);
        },
    });
};

'use strict';

const Cli = require('lib/cli');

module.exports = (table, resource) => Cli.createCommand('list', {
    dirname: __dirname,
    description: `List ${resource.title}`,
    plugins: resource.plugins,
    params: resource.params,
    options: resource.options,
    handler: async args => {
        const result = await args.helpers.api
            .get(`firewall/${args.firewall}/${table}`);

        return args.helpers.sendOutput(args, result.sort((r1, r2) => r1.priority - r2.priority));
    },
});

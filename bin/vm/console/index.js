'use strict';

const Cli = require('lib/cli');
const Open = require('opn');
const Chalk = require('chalk');

module.exports = resource => Cli.createCommand('console', {
    dirname: __dirname,
    description: `Open ${resource.title} console in web-browser`,
    plugins: resource.plugins,
    params: resource.params,
    options: resource.options,
    handler: async args => {

        const vm = await args.helpers.api.get(resource.url(args));

        const url = `https://console.hyperone.com/console/#/?scope=h1&username=${vm._id}&password=${args.apiKey}&billingTenant=${args.profile.project._id}`;

        console.log('Attempting to open the following url in your browser: ');
        console.log();
        console.log(Chalk.underline(url));
        console.log();
        console.log('If the console does not automatically open, please copy this address and paste it into your browser.');

        return Open(url).then(() => {});
    },
});

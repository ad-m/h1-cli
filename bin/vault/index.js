'use strict';

const genericDefaults = require('bin/generic/defaults');
const genericResource = require('bin/generic');

const resource = {
    name: 'vault',
    defaultQuery: '[].{id:_id,name:name,size:size,state:state,processing:processing}',
    url: () => 'vault',
    plugins: genericDefaults.plugins,
    extraCommands: ['resize'],
    title: 'Vault',
};

const category = genericResource(resource);

category.addChild(require('./create')(resource));

category.addChild(require('./credential')(resource));

category.addChild(require('./ssh')(resource));

module.exports = category;

'use strict';

const Cli = require('lib/cli');
const fs = require('lib/fs');
const {hashPassword} = require('lib/credentials');
const genericDefaults = require('bin/generic/defaults');

const options = {
    name: {
        description: 'Virtual machine name',
        type: 'string',
        required: true,
    },
    type: {
        description: 'Virtual machine type name or ID',
        type: 'string',
        required: true,
    },
    password: {
        description: 'Initial administrator user password',
        type: 'string',
    },
    username: {
        description: 'Initial administrator username',
        type: 'string',
    },
    ssh: {
        action: 'append',
        description: 'SSH key ID or name that allows access.',
        type: 'string',
        dest: 'sshKeys',
    },
    image: {
        description: 'Image ID or name',
        type: 'string',
    },
    iso: {
        description: 'ISO ID or name',
        type: 'string',
    },
    'os-disk-name': {
        description: 'OS disk name',
        type: 'string',
    },
    'os-disk-type': {
        description: 'OS disk type',
        type: 'string',
    },
    'os-disk-size': {
        description: 'OS disk size',
        type: 'int',
    },
    'os-disk': {
        description: 'OS disk: [name,] type, size',
        type: 'string',
    },
    network: {
        description: 'Network ID or name to attach',
        type: 'string',
        ignoringScope: ['RBX'],
    },
    ip: {
        description: 'IP address for Virtual machine',
        type: 'string',
    },
    'no-start': {
        description: 'Do not start Virtual machine after creation',
        type: 'boolean',
    },
    'userdata-file': {
        description: 'Read userdata from file',
        type: 'string',
    },
    'ssh-file': {
        action: 'append',
        description: 'Read SSH key from file',
        type: 'string',
    },
};

module.exports = resource => Cli.createCommand('create', {
    description: `Create ${resource.title}`,
    plugins: genericDefaults.plugins,
    genericOptions: ['tag'],
    options: options,
    dirname: __dirname,
    priority: 25,
    handler: async (args) => {
        const newVM = {
            name: args.name,
            service: args.type,
            tag: require('lib/tags').createTagObject(args.tag),
        };

        if (args.password) {
            newVM.password = await hashPassword(args.password, ['unix']);
        }

        if (args.username) {
            newVM.username = args.username;
        }

        if (args.network || args.ip) {
            const netadp = {};

            if (args.network) {
                netadp.network = args.network;
                netadp.service = 'private';
            } else {
                const services = await args.helpers.api.get('/service/');
                const vm_service = services.find(service => service.name === args.type || service._id === args.type);
                if (!vm_service) {
                    throw Cli.error.notFound(`Given flavour '${args.type}' of the given virtual machine variant was not found. Check the value of the --type parameter and try again.`);
                }
                netadp.service = vm_service.data.netadp[0].service;
            }

            if (args.ip) {
                netadp.ip = args.ip;
            }

            newVM.netadp = [netadp];
        }

        if (args['no-start']) {
            newVM.boot = false;
        }

        if (args['os-disk'] || args['os-disk-name'] && args['os-disk-type'] && args['os-disk-size']) {
            newVM.disk = [];

            let osDisk = args['os-disk'] ? args['os-disk'].split(',') : [];
            osDisk = osDisk.length === 2 ? [`${args.name}-os`, ...osDisk] : osDisk;
            newVM.disk.push({
                name: osDisk[0] || args['os-disk-name'],
                service: osDisk[1] || args['os-disk-type'],
                size: osDisk[2] || args['os-disk-size'],
            });
        }

        ['iso', 'image', 'sshKeys'].forEach(param => {
            if (args[param] != null) {
                newVM[param] = args[param];
            }
        });


        if (args['ssh-file']) {
            const sshKeys = newVM.sshKeys || [];
            sshKeys.push(
                ...await Promise.all(
                    args['ssh-file'].map(fs.getFileContent)
                ).then(keys => keys.map(x => x.toString('utf-8')))
            );
            newVM.sshKeys = sshKeys;
        }

        if (args['userdata-file']) {
            const content = await fs.getFileContent(args['userdata-file']);
            newVM.userMetadata = content.toString('base64');
        }

        return args.helpers.api.post('vm', newVM)
            .then(result => args.helpers.sendOutput(args, result));
    },
});

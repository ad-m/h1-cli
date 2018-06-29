'use strict';
const mailer = require('nodemailer');
const childProcess = require('child_process');
const shell_quote = require('shell-quote');

const getConfigValue = (name, options = {}) => {
    if (!process.env[name] && typeof options.defaultValue === 'undefined') {
        console.log(process.env);
        throw `${options.label || name} (${name}) variable is unset`;
    }
    const fn = options.parse || (v => v);
    return fn(process.env[name] || options.defaultValue);
};

const getConfig = () => {
    const specs = {
        SMTP_URL: {
            label: 'SMTP URL',
        },
        H1_USER: {
            label: 'HyperOne username',
        },
        H1_PASSWORD: {
            label: 'HyperOne password',
        },
        H1_PROJECT: {
            label: 'HyperOne project ID or name',
        },
        MONITORING_EMAILS: {
            label: 'Recipients of monitoring notification',
            parse: v => v.split(','),
        },
        MONITORING_SUCCESS_EMAILS: {
            label: 'Recipients of progress notification',
            parse: v => v.split(',').filter(x => !!x),
            defaultValue: '',
        },
        MONITORING_CMD: {
            label: 'Monitored executable',
            defaultValue: 'ava --verbose',
        },
        SMTP_SENDER: {
            label: 'Monitoring sender address',
            defaultValue: 'h1-cli@hyperone.com',
        },
        MONITORING_TIMEOUT: {
            label: 'Maximum execution time',
            parse: v => parseInt(v),
            defaultValue: 60*30,
        },
    };
    // TODO: How to write it in clear way object -> list of properties -> object?
    const config = {};
    Object.entries(specs).forEach(([name, options]) => {
        config[name] = getConfigValue(name, options);
    });
    return config;
};

const sendMail = async (config, success, report) => {
    const smtpTransport = mailer.createTransport(config.SMTP_URL);

    const recipient = success ? config.MONITORING_SUCCESS_EMAILS : config.MONITORING_EMAILS;

    if (recipient.length > 0) {
        await smtpTransport.sendMail({
            from: config.SMTP_SENDER,
            to: recipient,
            subject: success ? 'Monitoring success report' : 'Monitoring failed report',
            text: report,
        });
        console.log('Error mail send!');
    }

    await smtpTransport.close();
};


// const getReport = (exec, argv=[], env={}) => execFile(exec, argv, {env: env});

const runProcess = async (cmd = [], env = {}, timeout = 60*30) => new Promise((resolve, reject) => {
    const arg = shell_quote.parse(cmd);

    const proc = childProcess.spawn(arg[0], arg.slice(1), {
        env: Object.assign({}, process.env, env),
        timeout: timeout * 1000,
        // stdio: [null, 'pipe', 'pipe']
    });
    let output = '';

    proc.on('close', (code) => {
        if (code !== 0) {
            const error = new Error(`Process exited with code ${code}`);
            error.code = code;
            error.output = output;
            reject(error);
        }
        resolve(output);
    });

    proc.stdout.on('data', (data) => {
        console.log(`${  data}`);
        output += data;
    });

    proc.stderr.on('data', (data) => {
        console.error(`${  data}`);
        output += data;
    });
});


const main = async () => {
    const config = getConfig();
    await runProcess(`h1 login --username ${config.H1_USER} --password ${config.H1_PASSWORD}`);
    await runProcess(`h1 project select --project ${config.H1_PROJECT}`);

    try {
        const output = await runProcess(config.MONITORING_CMD);
        await sendMail(config, true, output);
    } catch (err) {
        await sendMail(config, false, err.output);
    }
    try {
        await runProcess('/bin/bash ./scripts/cleanup_project.sh', {H1_PROJECT: config.H1_PROJECT});
    } catch (err) {
        // This is just cleaning. If fails if there is no resources to clean up.
    }
};

main().catch((err) => {
    console.error('Something terrible happened.', err);
    process.exit(-1);
});
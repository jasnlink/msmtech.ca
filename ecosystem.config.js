module.exports = {
    apps: [{
        name: 'msmtech-ca',
        script: 'npm',
        args: 'run start',
        watch: true,
        time: true,
        ignore_watch: ['prisma/*', '.next/*']
    }]
};

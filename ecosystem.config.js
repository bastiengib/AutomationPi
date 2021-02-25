module.exports = {
  apps : [{
    name: 'AutomationPi',
    script: 'index.js',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'pi',
      host : ['192.168.1.2'],
      ref  : 'origin/master',
      repo : 'git@github.com:bastiengib/AutomationPi.git',
      path : '/home/pi/web/backend/AutomotionPi/',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

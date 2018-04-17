const nconf = require('nconf');
const path = require('path');
const language = nconf.argv()
    .env()
    .file({ file: path.join('./en.json' )});
module.exports.dataEn = language.get('en');
module.exports.dataUa = language.get('ua');
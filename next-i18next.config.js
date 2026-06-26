const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['es', 'en-US'],
  },
   // Forzar la ruta absoluta para entornos Serverless
  localePath: path.resolve('./src/locales'), 
};
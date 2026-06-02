const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
  }
}

module.exports = withBundleAnalyzer(config)

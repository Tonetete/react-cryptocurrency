module.exports = {
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'react-cryptocurrencies'
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};
